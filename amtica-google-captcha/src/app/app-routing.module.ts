import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { LoggedInGuard } from './guards/loggedIn/loggedIn.guard';

const routes: Routes = [
  { path: 'home', canActivate: [LoggedInGuard], component: HomeComponent },
  { path: 'login', canActivate: [LoggedInGuard], component: LoginComponent },
  { path: 'signUp', canActivate: [LoggedInGuard], component: SignupComponent },
  { path: 'user', canActivate: [AuthGuard], component: UserComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
