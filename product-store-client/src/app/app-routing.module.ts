import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './guards/auth.guard'; 
import { RegisterComponent } from './auth/register/register.component';
import { LiveUsersComponent } from './live-users/live-users.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: ProductListComponent, canActivate: [AuthGuard] },
  { path: 'product-list', component: ProductListComponent, canActivate: [AuthGuard] },
  { path: 'add-product', component: ProductAddComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'live-users', component: LiveUsersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
