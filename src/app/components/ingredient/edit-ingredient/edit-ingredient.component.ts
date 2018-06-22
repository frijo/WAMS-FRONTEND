import { Component, OnInit, EventEmitter, Input,Output } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { Ingredient } from '../../../models/ingredient';
import { IngredientService } from '../../../services/ingredient.service';
import { UserService } from '../../../services/user.service';
import { GLOBAL } from '../../../services/global';

@Component({
	selector: 'sel-edit-ingredient',
	templateUrl: './edit-ingredient.component.html',
	providers:[IngredientService,UserService]

})
export class EditIngredientComponent implements OnInit{
	public title:string;
	public ingredient: Ingredient;
	public status:string;
	public token;

	@Input('ingredienteInfo') ingredientinfo: Ingredient;

	constructor(
		private _userService: UserService,
		private _router: Router,
		private _route: ActivatedRoute,
		private _ingredientesService: IngredientService
	){
		this.title= 'Editar Ingrediente';
		//this.ingredient = new  Ingredient( 0,"","",0 ,0 ,0,"","");
		this.ingredient = new  Ingredient();
		
	}
	ngOnInit(){

		console.log('Componete de Editar Ingrediente esta cargado...');
		this.token= this._userService.getToken();
		this.status="";
		/*this._route.params.subscribe(params =>{
			let id = params['id'];
			this.getIngredient(id);

		});*/
		this.getIngredient(this.ingredientinfo.id);		
	
	}
	@Output() edited = new EventEmitter();
	sendIngredient($event){
		this.edited.emit({send:true});
	}
	getIngredient(id){

		this._ingredientesService.getIngredient(id,this.token).subscribe(
			response =>{
				if(response.ingredient && response.ingredient.id){
					console.log(response);
					this.ingredient= response.ingredient;
					
					
				}else{
					
					console.log(response);
				}
			},
			error =>{
				console.log(<any>error);

			}
		);
	}
	onSubmit(form,$event){
		this._ingredientesService.updateIngredient(this.ingredient,this.token).subscribe(
			response =>{
				if(response.ingredient && response.ingredient.id){
					console.log(response);

					this.status='success';
					form.reset();
				//	this._router.navigate(['/ingredients']);
				}else{
					this.status='error';
					console.log(response);
				}
			},
			error =>{
				console.log(<any>error);

			}
		);



	}

}