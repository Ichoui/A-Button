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
import { GrisComponent } from './gris/gris.component';
import { AComponent } from './a/a.component';

@NgModule({
  declarations: [
    AppComponent,
    GrisComponent,
    AComponent
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
