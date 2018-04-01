import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'angular2-moment';
//SERVICES
import { IngredientService } from './services/ingredient.service';

//COMPONENTS
import { IngredientComponent } from './components/ingredient/ingredient.component';
import { CreateIngredientComponent } from './components/create-ingredient/create-ingredient.component';
import { EditIngredientComponent } from './components/edit-ingredient/edit-ingredient.component';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    IngredientComponent,
    CreateIngredientComponent,
    EditIngredientComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
    MomentModule
  ],
  providers: [
  	appRoutingProviders,
  	IngredientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
