import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { Ingredient } from '../../models/ingredient';
import { IngredientService } from '../../services/ingredient.service';
import { GLOBAL } from '../../services/global';

@Component({
	selector: 'sel-ingredient',
	templateUrl: './ingredient.component.html',
	providers:[IngredientService]

})
export class IngredientComponent implements OnInit{
	
	public title:string;
	public ingredient: Ingredient;
	public ingredients:Ingredient[];
	public status:string;
	//public show:booleam;
	constructor(
	
		private _router: Router,
		private _route: ActivatedRoute,
		private _ingredientesService: IngredientService
	){
		this.title= 'Lista de Ingredientes';
	//	this.show = false;
	}
	ngOnInit(){
		this.getIngredients();
	}
	getIngredients(){
	//	console.log('Entro en funcion getIngredients');
		this._ingredientesService.getAllIngredients().subscribe(
			response=>{
				if(!response){
					this.status='error, no hay datos';
					
				}
				else{
					
					this.status='success';
					this.ingredients= response.ingredients;
					
					this.ingredients = this.ingredients.map(function(ingredient) {
					      ingredient.show = false;   
					      return ingredient;
					});
					console.log(this.ingredients);
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
	deleteIngredient(id){
		this._ingredientesService.deleteIngredient(id).subscribe(
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
		this.getIngredients();
	}
	toggleVisibility(index: number){
		this.ingredients[index].show = !this.ingredients[index].show;
		//event.target.classList.toggle('visible');
	}


}