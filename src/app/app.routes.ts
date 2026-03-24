import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Page404 } from './pages/page-404/page-404';
import { Register } from './pages/register/register';
import { ManageRecipe } from './pages/manage-recipe/manage-recipe';
import { EditRecipe } from './pages/edit-recipe/edit-recipe';
import { userGuard } from './guards/user-guard';
import { adminGuard } from './guards/admin-guard';
import { ManageProduct } from './pages/manage-product/manage-product';
import { EditProduct } from './pages/edit-product/edit-product';

export const routes: Routes = [
  { path: 'home', component: Home, canActivate: [userGuard] },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'manage-recipe', component: ManageRecipe, canActivate: [userGuard] },
  { path: 'edit-recipe/:id', component: EditRecipe, canActivate: [adminGuard] },
  { path: 'add-recipe', component: EditRecipe, canActivate: [adminGuard] },

  { path: 'manage-product', component: ManageProduct, canActivate: [adminGuard] },
  { path: 'edit-product/:id', component: EditProduct, canActivate: [adminGuard] },
  { path: 'add-product', component: EditProduct, canActivate: [adminGuard] },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: Page404 },
];
