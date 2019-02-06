import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { firebase } from '../environments/firebase';
import { ConsComponent } from './cons/cons.component';
import { RemarquesComponent } from './remarques/remarques.component';
import { ConpersoComponent } from './conperso/conperso.component';
import { LayoutComponent } from './layout/layout.component';
import { ButtonsComponent } from './elements/buttons/buttons.component';
import { LoginComponent } from './user/login/login.component';
import { SwitchComponent } from './elements/switch/switch.component';
import { AuthService } from './user/providers/auth.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NotfoundComponent } from './elements/notfound/notfound.component';
import {ReactiveFormsModule} from '@angular/forms';
import { AvatarconComponent } from './elements/avatarcon/avatarcon.component';
import { MenuComponent } from './elements/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    ConsComponent,
    RemarquesComponent,
    ConpersoComponent,
    LayoutComponent,
    ButtonsComponent,
    LoginComponent,
    SwitchComponent,
    NotfoundComponent,
    AvatarconComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    ConpersoComponent,
    ConsComponent,
    RemarquesComponent,
    SwitchComponent,
    AvatarconComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
