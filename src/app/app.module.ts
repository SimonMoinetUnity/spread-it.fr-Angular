import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import * as fr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './component/User-Components/user-list/user-list.component';
import { MessageListComponent } from './component/Message-Components/message-list/message-list.component';
import { AdduserComponent } from './component/User-Components/adduser/adduser.component';
import { EdituserComponent } from './component/User-Components/edituser/edituser.component';
import { AddcanalComponent } from './component/Canal-components/addcanal/addcanal.component';
import { HomeComponent } from './component/Structure-components/home/home.component';
import { HeaderComponent } from './component/Structure-components/header/header.component';
import { FooterComponent } from './component/Structure-components/footer/footer.component';
import { AddmessageComponent } from './component/Message-Components/addmessage/addmessage.component';

import { MessageComponent } from './component/Message-Components/message/message.component';
import { CanalComponent } from './component/Canal-components/canal/canal.component';

import { LoginComponent } from './component/User-Components/login/login.component';
import { CanalCardComponent } from './component/Canal-components/canal-card/canal-card.component';
import { httpInterceptorProviders } from './Interceptor';
import { TokenInterceptorProvider } from './Interceptor/token.interceptor';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TextEditorComponent } from './component/Article-components/article-editor/text-editor.component';
import { ArticleComponent } from './component/Article-components/article-display/article.component';
import { ArticleListUserComponent } from './component/Article-components/article-list-user/article-list-user.component';
import { ArticleCardComponent } from './component/Article-components/article-card/article-card.component';
import { AccueilComponent } from './component/Structure-components/accueil/accueil.component';
import { ContactComponent } from './component/Structure-components/contact/contact.component';
import { AvatarModule } from 'ngx-avatars';
import { AvisComponent } from './component/Avis-components/avis/avis.component';
import { LoginResetComponent } from './component/User-Components/login-Reset/login-reset.component';


@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    MessageListComponent,
    AdduserComponent,
    EdituserComponent,
    AddcanalComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AddmessageComponent,

    MessageComponent,
    CanalComponent,
    LoginComponent,
    CanalCardComponent,
    TextEditorComponent,
    ArticleComponent,
    ArticleListUserComponent,
    ArticleCardComponent,
    AccueilComponent,
    ContactComponent,
    AvisComponent,
    LoginResetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule,
    AvatarModule

  ],
  providers: [
     { provide: LOCALE_ID, useValue: 'fr-FR' },
     TokenInterceptorProvider
  ],
  
  bootstrap: [HomeComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(fr.default);
  }
 }
