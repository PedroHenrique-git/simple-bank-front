import type { Routes } from "@angular/router";

export const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/register/register.routes')
    .then(mod => mod.routes) },
  { path: 'login', loadChildren: () => import('./pages/login/login.routes')
    .then(mod => mod.routes) },
];
