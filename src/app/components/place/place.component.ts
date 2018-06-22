import { Component, OnInit, EventEmitter, Input,Output } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { PlaceService } from '../../services/place.service';
import { GLOBAL } from '../../services/global';
import { Place } from '../../models/place';

@Component({
	selector: 'sel-place',
	templateUrl: './place.component.html',
	providers:[UserService,PlaceService]

})
export class PlaceComponent implements OnInit{
	public title:string;
	public status:string;
	public place:Place;
	public places: Place[];
	public token;
	public message:string;
	constructor(
	
		private _router: Router,
		private _route: ActivatedRoute,
		private _userService: UserService,
		private _placeService: PlaceService
	){
		this.token = this._userService.getToken();
		this.title= 'Lugares del local';
		this.place = new  Place();

	}
	ngOnInit(){

		console.log('Componete de PLACE esta cargado...');
		this.getPlaces();
	}
	getPlaces(){
		
		this._placeService.getAllPlaces().subscribe(
			response=>{
				if(!response){
					this.status='error, no hay datos';
					
				}
				else{
					
					this.status='success';
					this.places= response.places;
					
					
					console.log(this.places);
				}
			},
			error=>{
				var errorMessage = <any>error;
		//		console.log(errorMessage);
				
				if(errorMessage != null){
					this.status='error'
				}
			}
		);
	}
	deletePlace(id){
		console.log("Entro a Delete",id)
		this._placeService.deletePlace(id,this.token).subscribe(
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
		this.getPlaces();
	}

}