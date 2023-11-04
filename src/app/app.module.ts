import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanalListComponent } from './component/canal-list/canal-list.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { MessageListComponent } from './component/message-list/message-list.component';
import { AdduserComponent } from './component/adduser/adduser.component';
import { EdituserComponent } from './component/edituser/edituser.component';
import { EditcanalComponent } from './component/editcanal/editcanal.component';
import { AddcanalComponent } from './component/addcanal/addcanal.component';
import { HomeComponent } from './component/home/home.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { AddmessageComponent } from './component/addmessage/addmessage.component';

import { MessageComponent } from './component/message/message.component';
import { CanalComponent } from './component/canal/canal.component';

import { LoginComponent } from './component/login/login.component';
import { CanalCardComponent } from './component/canal-card/canal-card.component';
import { httpInterceptorProviders } from './Interceptor';
import { AuthInterceptor } from './Interceptor/auth.interceptor';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TextEditorComponent } from './component/text-editor/text-editor.component';


@NgModule({
  declarations: [
    AppComponent,
    CanalListComponent,
    UserListComponent,
    MessageListComponent,
    AdduserComponent,
    EdituserComponent,
    EditcanalComponent,
    AddcanalComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AddmessageComponent,

    MessageComponent,
    CanalComponent,
    LoginComponent,
    CanalCardComponent,
    TextEditorComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule
  ],
  providers: [
  //   { provide: LOCALE_ID, useValue: 'fr-FR' },
  //   httpInterceptorProviders
  // {
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: AuthInterceptor,
  //   multi: true,
  //   }
  ],
  bootstrap: [HomeComponent]
})
export class AppModule { }
