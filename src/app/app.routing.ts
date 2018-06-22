import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componentes

import { IngredientComponent } from './components/ingredient/ingredient.component';
import { CreateIngredientComponent } from './components/ingredient/create-ingredient/create-ingredient.component';
import { EditIngredientComponent } from './components/ingredient/edit-ingredient/edit-ingredient.component';
import { MealComponent } from './components/meal/meal.component';
import { CreateMealComponent } from './components/meal/create-meal/create-meal.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { PlaceComponent } from './components/place/place.component';
import { CreatePlaceComponent } from './components/place/create/create-place.component';
import { OrderComponent } from './components/order/order.component';
import { CreateOrderComponent } from './components/order/create/create-order.component';


//IMPORTAR SERVICIOS
import { SessionGuard } from './services/session.guard';
import { SessionGuardAdmin } from './services/session-admin.guard';


const appRoutes: Routes =[
	{path: '',component: HomeComponent},
	{path: 'ingredients',component: IngredientComponent,canActivate:[SessionGuard]},
	{path: 'new-ingredient',component: CreateIngredientComponent,canActivate:[SessionGuard]},
	{path: 'edit-ingredient/:id',component: EditIngredientComponent,canActivate:[SessionGuard]},
	{path: 'meals',component: MealComponent,canActivate:[SessionGuard]},
	{path: 'new-meal',component: CreateMealComponent,canActivate:[SessionGuard]},
	{path: 'register',component: RegisterComponent,canActivate:[SessionGuard,SessionGuardAdmin]},
	{path: 'login',component: LoginComponent},
	{path: 'places',component: PlaceComponent,canActivate:[SessionGuard,SessionGuardAdmin]},
	{path: 'new-place',component: CreatePlaceComponent,canActivate:[SessionGuard,SessionGuardAdmin]},
	{path: 'orders',component: OrderComponent,canActivate:[SessionGuard]},
	{path: 'new-order',component: CreateOrderComponent,canActivate:[SessionGuard,SessionGuardAdmin]},
	{path: '**',component: HomeComponent} //la ruta '**' significa cuando se digita cualquier ruta q no exista te redirije al Home
];
export const appRoutingProviders: any[] =[];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);