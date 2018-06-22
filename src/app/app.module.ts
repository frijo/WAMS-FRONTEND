import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'angular2-moment';
import { SharedModule } from './modules/shared.module';

//SERVICES
import { IngredientService } from './services/ingredient.service';
import { SessionGuard } from './services/session.guard';
import { UserService } from './services/user.service';
import { BillService } from './services/bill.service';
import { SessionGuardAdmin } from './services/session-admin.guard';

//DIRECTIVES
import { EqualValidator } from './directives/equal-validator.directive';
//COMPONENTS
import { IngredientComponent } from './components/ingredient/ingredient.component';
import { MealComponent } from './components/meal/meal.component';
import { CreateIngredientComponent } from './components/ingredient/create-ingredient/create-ingredient.component';
import { EditIngredientComponent } from './components/ingredient/edit-ingredient/edit-ingredient.component';
import { CreateMealComponent } from './components/meal/create-meal/create-meal.component';
import { EditMealComponent } from './components/meal/edit-meal/edit-meal.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { PlaceComponent } from './components/place/place.component';
import { CreatePlaceComponent } from './components/place/create/create-place.component';
import { OrderComponent } from './components/order/order.component';
import { CreateOrderComponent } from './components/order/create/create-order.component';

import { DatatableComponent } from './components/order/create/datatable.component';
import { ColumnComponent } from './components/order/create/column.component';

import { NgbdModalBasic } from './modal-basic'
import { AppComponent } from './app.component';
import {PopupModule} from 'ng2-opd-popup';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    IngredientComponent,
    CreateIngredientComponent,
    EditIngredientComponent,
    MealComponent,
    CreateMealComponent,
    EditMealComponent,
    RegisterComponent,
    LoginComponent,
    EqualValidator,
    HomeComponent,
    PlaceComponent,
    CreatePlaceComponent,
    OrderComponent,
    CreateOrderComponent,
    DatatableComponent,
    ColumnComponent,
    NgbdModalBasic
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
    MomentModule,
    ReactiveFormsModule,
    SharedModule,
    PopupModule.forRoot(),
    NgbModule.forRoot()
  ],
  providers: [
  	appRoutingProviders,
  	IngredientService,
    SessionGuard,
    SessionGuardAdmin,
    UserService,
    BillService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
