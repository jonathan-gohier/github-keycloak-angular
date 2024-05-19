import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { authGuard } from './core/guard/auth.guard';
import { HomeComponent } from './module/home/home.component';

export const routes: Routes = [
  { path: '', canActivate: [authGuard], component: AppComponent, pathMatch: 'full'},
  { path: 'home', component: HomeComponent, pathMatch:'full'}
];
