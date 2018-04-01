import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componentes

import { IngredientComponent } from './components/ingredient/ingredient.component';
import { CreateIngredientComponent } from './components/create-ingredient/create-ingredient.component';
import { EditIngredientComponent } from './components/edit-ingredient/edit-ingredient.component';

const appRoutes: Routes =[
	{path: 'ingredients',component: IngredientComponent},
	{path: 'new-ingredient',component: CreateIngredientComponent},
	{path: 'edit-ingredient/:id',component: EditIngredientComponent}
];
export const appRoutingProviders: any[] =[];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);