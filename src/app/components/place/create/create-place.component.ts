import { Component, OnInit, EventEmitter, Input,Output } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { Place } from '../../../models/place';
import { PlaceService } from '../../../services/place.service';
import { UserService } from '../../../services/user.service';
import { GLOBAL } from '../../../services/global';
@Component({
	selector: 'sel-new-place',
	templateUrl: './create-place.component.html',
	providers:[PlaceService,UserService]

})
export class CreatePlaceComponent implements OnInit{
	public title:string;
	public place: Place;
	public status:string;
	public token;
	public message:string;
	constructor(
	
		private _router: Router,
		private _route: ActivatedRoute,
		private _placeService: PlaceService,
		private _userService: UserService
	){
		this.token = this._userService.getToken();
		this.title= 'Crear Lugar';
		//this.ingredient = new  Ingredient( 0,"","",0 ,0 ,0,"","");
		this.place = new  Place();

	}
	ngOnInit(){

		console.log('Componete de crear Lugares esta cargado...');
		
	
	}

	@Output() sended = new EventEmitter();
	sendPlace($event){
		this.sended.emit({send:true});
	}
	
	onSubmit(form,$event){
		this._placeService.createPlace(this.place,this.token).subscribe(
			response =>{
				if(response.place && response.place.id){
					this.status='success';
					form.reset();
					this._router.navigate(['/places']);
				}else{
					this.status='error';
					console.log("estatus",response.status);
					console.log(response);
					this._router.navigate(['/places']);
				}
			},
			error =>{
				console.log(<any>error);
				if(error.statusText =="Unauthorized"){
					console.log("Inicia Sesion para poder ejecutar esta funcion");
				}
				
			}
		);



	}

}