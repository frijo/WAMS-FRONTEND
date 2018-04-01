import { Component, OnInit, EventEmitter, Input,Output } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { Ingredient } from '../../models/ingredient';
import { IngredientService } from '../../services/ingredient.service';
import { GLOBAL } from '../../services/global';

@Component({
	selector: 'sel-new-ingredient',
	templateUrl: './create-ingredient.component.html',
	providers:[IngredientService]

})
export class CreateIngredientComponent implements OnInit{
	public title:string;
	public ingredient: Ingredient;
	public status:string;
	
	constructor(
	
		private _router: Router,
		private _route: ActivatedRoute,
		private _ingredientesService: IngredientService
	){
		this.title= 'Crear Ingrediente';
		//this.ingredient = new  Ingredient( 0,"","",0 ,0 ,0,"","");
		this.ingredient = new  Ingredient();

	}
	ngOnInit(){

		console.log('Componete de crear Ingredientes esta cargado...');
	
	}

	@Output() sended = new EventEmitter();
	sendIngredient($event){
		this.sended.emit({send:true});
	}
	onSubmit(form,$event){
		this._ingredientesService.createIngredient(this.ingredient).subscribe(
			response =>{
				if(response.ingredient && response.ingredient.id){
					console.log(response);

					this.status='success';
					form.reset();
					this._router.navigate(['/ingredients']);
				}else{
					this.status='error';
					console.log(response);
					this._router.navigate(['/ingredients']);
				}
			},
			error =>{
				console.log(<any>error);

			}
		);



	}

}