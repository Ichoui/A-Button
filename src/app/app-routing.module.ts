import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './user/login/login.component';
import { AuthGuard } from './user/guards/auth.guard';
import { NotfoundComponent } from './elements/notfound/notfound.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/remarques-de-cons',
        pathMatch: 'full'
      },
      {
        path: 'remarques-de-cons',
        component: LayoutComponent
      }
    ]
  },
  {
    path:'**',
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
