import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireModule} from 'angularfire2';
import {
  MatButtonModule,
  MatCardModule, MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule, MatSortModule, MatTableModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {firebase} from '../environments/firebase';
import { ConsComponent } from './cons/cons.component';
import { RemarquesComponent } from './remarques/remarques.component';
import { ConpersoComponent } from './conperso/conperso.component';
import { LayoutComponent } from './layout/layout.component';
import { ButtonsComponent } from './elements/buttons/buttons.component';
import { LoginComponent } from './user/login/login.component';
import { SwitchComponent } from './elements/switch/switch.component';

@NgModule({
  declarations: [
    AppComponent,
    ConsComponent,
    RemarquesComponent,
    ConpersoComponent,
    LayoutComponent,
    ButtonsComponent,
    LoginComponent,
    SwitchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebase),
    AngularFirestoreModule,

    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
