export class Article{
    id: number;
    html: string;
    titre: string;
    published: number;
    userId: number;
    imageName: String;
    description: String;
    date : Date;
    nbAvis : number;
    noteMoy : number;

    constructor(noteMoy : number, nbAvis : number, id: number, html : string, published : number,titre: string, userId: number, imageName: String, description: String,date:Date){
        this.id=id;
        this.html = html;
        this.published = published;
        this.titre = titre;
        this.userId = userId;
        this.imageName = imageName;
        this.description = description;
        this.date = date;
        this.nbAvis = nbAvis;
        this.noteMoy = noteMoy;
    }
}