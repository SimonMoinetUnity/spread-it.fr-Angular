import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/Structure-components/home/home.component';
import { AddcanalComponent } from './component/Canal-components/addcanal/addcanal.component';
import { MessageListComponent } from './component/Message-Components/message-list/message-list.component';
import { AdduserComponent } from './component/User-Components/adduser/adduser.component';
import { LoginComponent } from './component/User-Components/login/login.component';
import { EdituserComponent } from './component/User-Components/edituser/edituser.component';
import { AuthGuard } from './Guards/auth.guard';
import { AdminGuard } from './Guards/admin.guard';
import { TextEditorComponent } from './component/Article-components/article-editor/text-editor.component';
import { ArticleComponent } from './component/Article-components/article-display/article.component';
import { ArticleListUserComponent } from './component/Article-components/article-list-user/article-list-user.component';
import { AccueilComponent } from './component/Structure-components/accueil/accueil.component';
import { LoginResetComponent } from './component/User-Components/login-Reset/login-reset.component';


const routes: Routes = [
 
  {path :'', component:AccueilComponent},
  {path :'textEditor', component:TextEditorComponent, canActivate:[AuthGuard]},
  {path :'textEditor/:id', component:TextEditorComponent, canActivate:[AuthGuard]},
  {path :'login', component:LoginComponent},
  {path :'login/reset', component:LoginResetComponent, canActivate:[AuthGuard]},
  {path :'register', component:AdduserComponent},
  {path :'addCanal', component:AddcanalComponent, canActivate:[AuthGuard]},
  {path :'canal', component:MessageListComponent, canActivate:[AuthGuard]},
  {path: 'profile', component: EdituserComponent, canActivate:[AuthGuard]},
  {path: 'article/:id', component: ArticleComponent},
  {path: 'articles', component: ArticleListUserComponent, canActivate:[AuthGuard]},
  { path: '**', redirectTo: '/' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
