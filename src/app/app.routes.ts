import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { ProductComponent } from './views/product/product.component';
import { ProfileComponent } from './views/profile/profile.component';
import { CartComponent } from './views/cart/cart.component';
import { CategoriesComponent } from './views/categories/categories.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent, pathMatch: 'full' },
  { path: 'cart', component: CartComponent, pathMatch: 'full' },
  { path: 'product/:id', component: ProductComponent, pathMatch: 'full' },
  {
    path: 'categories/:category',
    component: CategoriesComponent,
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '' },
];
