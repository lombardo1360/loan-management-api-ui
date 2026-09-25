import { Routes } from '@angular/router';
import { LoanList } from './features/loans/loan-list/loan-list';
import { Login } from './features/auth/login/login';
import { authGuard } from './core/guards/auth.guard-guard';
import { LoanForm } from './features/loans/loan-form/loan-form';
import { LoanDetail } from './features/loans/loan-detail/loan-detail';
import { ClientList } from './features/clients/client-list/client-list';
import { ClientForm } from './features/clients/client-form/client-form';
import { UserList } from './features/users/user-list/user-list';
import { adminGuard } from './core/guards/admin.guard';
import { UserForm } from './features/users/user-form/user-form';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },

  {
    path: 'loans',
    component: LoanList,
    canActivate: [authGuard]
  },
  {
    path: 'loans/new',
    component: LoanForm,
    canActivate: [authGuard]
  },

  {
  path: 'loans/:id/edit',
  component: LoanForm,
  canActivate: [authGuard]
  },
  {
    path: 'loans/:id',
    component: LoanDetail,
    canActivate: [authGuard]
  },
   {
    path: 'clients/new',
    component: ClientForm,
    canActivate: [authGuard]
  },
  {
  path: 'clients',
  component: ClientList,
  canActivate: [authGuard]
  },
  {
  path: 'users/new',
  component: UserForm,
  canActivate: [authGuard, adminGuard]
},
{
  path: 'users/:id/edit',
  component: UserForm,
  canActivate: [authGuard, adminGuard]
},
{
  path: 'users',
  component: UserList,
  canActivate: [authGuard, adminGuard]
},
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: 'login'
  }
];
