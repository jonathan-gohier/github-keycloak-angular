import { Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: AppComponent, pathMatch: 'full'}
];
