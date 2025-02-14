import { authGuard } from './shared/guarde/auth.guard';
import { Routes } from '@angular/router';


export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'home',loadComponent:() => import('./layout/pages/home/home.component').then(m => m.HomeComponent),canActivate:[authGuard]},
    {path:'profile',loadComponent:() => import('./layout/pages/profile/profile.component').then(m => m.ProfileComponent),canActivate:[authGuard]},
    {path:'singlepost/:id',loadComponent:() => import('./layout/pages/singlepost/singlepost.component').then(m => m.SinglepostComponent),canActivate:[authGuard]},
    {path:'login', loadComponent: () => import('./layout/pages/login/login.component').then(m => m.LoginComponent)},
    {path:'register',loadComponent:() => import('./layout/pages/register/register.component').then(m => m.RegisterComponent)},
    {path:'**',loadComponent:() => import('./layout/addation/not-found/not-found.component').then(m => m.NotFoundComponent),canActivate:[authGuard]},
];
