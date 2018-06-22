import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { Meal } from '../../models/meal';
import { MealService } from '../../services/meal.service';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';

@Component({
	selector: 'sel-meal',
	templateUrl: './meal.component.html',
	providers:[MealService,UserService]

})
export class MealComponent implements OnInit{
	
	public title:string;
	public meal: Meal;
	public meals:Meal[];
	public status:string;
	public plop:string;
	public token;
	constructor(
		private _userService: UserService,
		private _router: Router,
		private _route: ActivatedRoute,
		private _mealService: MealService
	){
		this.title= 'Lista de Platillos y Bebidas';
		this.plop ='no usado';	
	}
	ngOnInit(){
		this.getMeals();
		this.token= this._userService.getToken();
	}
	getMeals(){
	//	console.log('Entro en funcion getMeals');
		this._mealService.getAllMeals().subscribe(
			response=>{
				if(!response){
					this.status='error, no hay datos';
					
				}
				else{
					
					this.status='success';
					this.meals= response.meals;
					
					this.meals = this.meals.map(function(meal) {
					      meal.show = false;
					      meal.show_ingredients = false;
					         
					      return meal;
					});
					console.log(this.meals);
				}
			},
			error=>{
				var errorMessage = <any>error;
				console.log(errorMessage);
				
				if(errorMessage != null){
					this.status='error'
				}
			}
		);
	}
	deleteMeal(id){
		this._mealService.deleteMeal(id,this.token).subscribe(
			response=>{
				console.log(response);
				this.status='success';
				this.refresh();
				
			},
			error=>{
				console.log(<any>error);

				this.status='error';
			}
		);
	}
	refresh($event=null){
		this.getMeals();
	}
	toggleVisibility(index: number){
		this.meals[index].show = !this.meals[index].show;
		
		//event.target.classList.toggle('visible');
	}
	showIngredients(index:number){

		this.meals[index].show_ingredients = !this.meals[index].show_ingredients;
	}


}