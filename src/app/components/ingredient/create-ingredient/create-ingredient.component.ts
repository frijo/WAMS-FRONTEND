import { Component, OnInit, EventEmitter, Input,Output } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { Ingredient } from '../../../models/ingredient';
import { IngredientService } from '../../../services/ingredient.service';
import { UserService } from '../../../services/user.service';
import { GLOBAL } from '../../../services/global';

@Component({
	selector: 'sel-new-ingredient',
	templateUrl: './create-ingredient.component.html',
	providers:[IngredientService,UserService]

})
export class CreateIngredientComponent implements OnInit{
	public title:string;
	public ingredient: Ingredient;
	public status:string;
	public token;
	public message:string;
	constructor(
	
		private _router: Router,
		private _route: ActivatedRoute,
		private _ingredientesService: IngredientService,
		private _userService: UserService
	){
		this.token = this._userService.getToken();
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
		this._ingredientesService.createIngredient(this.ingredient,this.token).subscribe(
			response =>{
				if(response.ingredient && response.ingredient.id){
					


					this.status='success';
					form.reset();
					this._router.navigate(['/ingredients']);
				}else{
					this.status='error';
					console.log("estatus",response.status);
					console.log(response);
					this._router.navigate(['/ingredients']);
				}
			},
			error =>{
				this.status='error';
				console.log(<any>error);
				if(error.statusText =="Unauthorized"){
					console.log("Inicia Sesion para poder ejecutar esta funcion");
				}
				
			}
		);



	}

}