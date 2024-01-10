import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'src/app/service/message.service';
import { Message } from 'src/app/entity/message';
import { Canal } from 'src/app/entity/canal';
import { CanalService } from 'src/app/service/canal.service';
import { User } from 'src/app/entity/user';
import { UserService } from 'src/app/service/user.service';
import { Observable, catchError, forkJoin, interval, map, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from 'src/app/Interface/Role';
import { LocalStorageService } from 'src/app/service/local-storage.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  messagesToDisplay: Message[] = [];

  @Input()
  connectedUser: User={
    role: Role.USER,
    id: 0,
    nickname: '',
    email: '',
    password: '',
    isLogged: false,
    canals: [],
    nbArticles :0
  }

  canalUsed: Canal = this.canalService.canalUsed;

  messageList!: Message[] | null;
  canals: Canal[] = [];
  userList!: User[];
  userIdList!: number[];

  showAlert = false;
  showAlert2 = false;
  showAlert3 = false;

  form: FormGroup;

  canalId!:number;

  membreDejaExistant:boolean = false;
  utilisateurIntrouvable:boolean = false;
  userNickname!:String;

  conversationEnCours: boolean = false;

  dNoneClass!:String;

  constructor(private localStorageService: LocalStorageService, private route: ActivatedRoute,private fb: FormBuilder, private messageService: MessageService, private canalService: CanalService,
    private userService: UserService, private router: Router) {
    

    this.form = this.fb.group({
      canalMembres: ['', [Validators.required, Validators.maxLength(200)]],
    })

  }

  ngOnInit() {
    const valeur_Id = localStorage.getItem('UserId');
    if (valeur_Id !== null) {
      const id = parseInt(valeur_Id);
      this.userService.getUserById(id).subscribe((data : User) =>  {
        this.connectedUser  = data,
        this.canals[0] = this.connectedUser.canals[0];

        // localStorage.setItem('CanalId', (this.canals[0].id).toString());
        this.localStorageService.setItem('CanalId', (this.connectedUser.canals[0].id).toString());
        this.fonction();
        this.refresh();
      });
    }
    // this.connectedUser = this.userService.userlogged !== undefined ? this.userService.userlogged : this.connectedUser;
    // const valeur_Id2 = localStorage.getItem('CanalId');
    this.localStorageService.storage$.subscribe(value => {
      if (value !== null) {
        this.canalId = parseInt(value);
        this.canalService.getCanalById(this.canalId).subscribe((data : Canal) => {this.canalUsed = data});
      }
    })
    
    
    this.userService.getUserListByCanalId(this.canalId).subscribe((data : User[]) => {this.userList = data, this.canalUsed.users=data});
    this.refresh();
  }

  fonction(){
    for (let i = 1; i < this.connectedUser.canals.length; i++) {
      this.canalService.getCanalById(<number><unknown>this.connectedUser.canals[i]).subscribe((canal : Canal) => this.canals.push(canal));
    }

  }

  etatGauche(): String{
    if (this.conversationEnCours) {
      return 'd-none';
    }else{
      return ''
    }
    
  }

  etatDroite(): String{
    if (this.conversationEnCours) {
      return '';
    }else{
      return 'd-none'
    }
  }

  container():String{
    if (window.innerWidth <= 600) {
      return 'container1';
    }else{
      return 'container'
    }
  }

  getCanalId(message: Message) {
    return message.canal;
  }

  createCanal(){
    this.router.navigate(['addCanal'])
  }


  displayFullMessage(messagelist: Message[]) {
    for (let message of messagelist) {
      console.log(message.date + " - " + message.content + " - " + message.user.id)
    }
  }

  changeCanal(canal: Canal) {
    this.canalService.canalUsed = canal;
    // localStorage.setItem('CanalId', (canal.id).toString());
    this.localStorageService.setItem('CanalId', (canal.id).toString());
    this.conversationEnCours = true;
    this.refresh();
  }

  displayConsersations(){
    this.conversationEnCours = false;
  }


  refresh() {
    this.messageService.getMessagesByCanalId(this.canalId).subscribe((data) => this.messagesToDisplay = data)
    this.userService.getUserListByCanalId(this.canalId).subscribe((data : User[]) => {this.userList = data, this.canalUsed.users=data});
  }

  deleteCanal() {

    this.canalService.deleteCanal(this.canalUsed.id).subscribe(data => {
      console.log(data)

    });
    window.location.reload();
  }

  changeModal1(){
    this.membreDejaExistant = false;
    console.error('this.erreur : ' + this.membreDejaExistant);
  }

  changeModal2(){
    this.utilisateurIntrouvable = false;
    console.error('this.erreur : ' + this.utilisateurIntrouvable);
  }

  addMembers() {
    this.showAlert = true;
  }

  displayMembers() {
    this.showAlert3 = true;
  }

  closeMembers() {
    this.showAlert3 = false;
  }

  closeNouveauxMembers() {
    this.showAlert = false;
  }

  submitNewMembers() {

    const utilisateurs = this.form.value.canalMembres.split(',').map((user: string) => user.trim());
    console.log(utilisateurs);

    // Créer un tableau d'observables pour les appels asynchrones
    const observables = utilisateurs.map((userNickname: string) => {
    return this.userService.getUserIdByNickname(userNickname).pipe(
      catchError(error => {
          console.error(`Erreur 404: L'utilisateur avec le surnom "${userNickname}" n'a pas été trouvé.`);
          this.userNickname = userNickname;
          this.utilisateurIntrouvable = true;
          return of(null); // Retourner une observable nulle pour que forkJoin continue
      })
    );
    });

    // Vérifier si les utilisateurs sont déjà présents dans le canal
    const existingUsers = utilisateurs.filter((userNickname: string) =>
      this.canalUsed.users.some(existingUser => existingUser.nickname === userNickname)
    );

    // Afficher une erreur car des utilisateurs sont déjà présents
    if (existingUsers.length > 0) {  
      this.membreDejaExistant = true;
    console.error('Erreur : Certains utilisateurs sont déjà présents dans le canal.');
    return;
    }

    // Utiliser forkJoin pour attendre la fin de tous les appels asynchrones
    forkJoin(observables).subscribe((data:any) => {
      console.log('data : ' + data)

      for (let i = 0; i < data.length; i++) {
        const userId = data[i];
        console.log('userId : ' + userId)
        this.canalUsed.users.push({ id: userId, nickname: '', email: '', password: '', isLogged: false, canals: [], role: NaN, nbArticles:0});
        console.log('Id du User ajouté : ' + this.canalUsed.users[i].id);
      }

      // Après avoir obtenu tous les IDs, UPDATE le canal
      console.log('this.canalUsed.id : ' + this.canalUsed.id)
      this.canalService.updateCanal(this.canalUsed).subscribe(updatedCanal => {
        console.log('Canal updated', updatedCanal);
        this.showAlert = false;
        //this.router.navigate(['/' + this.canalUsed.id])
        window.location.reload();
        
      });

    })
  }

  isAdmin(): Boolean{
    console.log('canalUsed.adminId : ' + this.canalUsed.adminId)
    console.log('this.connectedUser?.id : ' + this.connectedUser?.id)
    return this.canalUsed.adminId == this.connectedUser?.id;
  }

  // // Fonction principale pour attribuer la liste de canaux
  assignCanals(canalsIds: number[]): Observable<void> {
    return this.canalService.getCanalsByIds(canalsIds).pipe(
      map((canaux: Canal[]) => {
        // Assigner la liste de canaux récupérés à la variable 'canals'
        this.canals = canaux;
        console.log("Id de 1er canal récupérér" + this.canals)

      })
    );
  }
}
