import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ConsComponent} from './cons/cons.component';
import {RemarquesComponent} from './remarques/remarques.component';
import {LayoutComponent} from './layout/layout.component';
import { LoginComponent } from './user/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/cons',
        pathMatch: 'full'
      },
      {
        path: 'cons',
        component: ConsComponent
      },
      {
        path: 'remarques',
        component: RemarquesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
