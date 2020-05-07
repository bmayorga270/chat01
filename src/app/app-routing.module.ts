import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersComponent} from './chat/users/users.component'
import { AdminComponent } from './chat/admin/admin.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'user/consultas_externas',
    pathMatch: 'full'
  },
  {
    path: 'chat/user/:usr',
    component: UsersComponent
  },
  {
    path: 'chat/admin',
    component: AdminComponent
  },
  {
    path: '**',
    redirectTo:  'chat/user/consultas_externas',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
