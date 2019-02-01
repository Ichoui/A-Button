import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GrisComponent} from './gris/gris.component';
import {AComponent} from './a/a.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/a',
    pathMatch: 'full'
  },
  {
    path:'gris',
    component: GrisComponent
  },
  {
    path:'a',
    component: AComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
