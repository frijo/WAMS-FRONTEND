import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';


@Component({
	selector: 'register',
	templateUrl:'./register.component.html',
	providers:[UserService]

})
export class RegisterComponent implements OnInit{
	
	public title:string;
	public user: User;
	public status: string;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService

	){
		this.title= 'Crear Usuario';
		this.user = new  User();
	}
	ngOnInit(){

		console.log('Componente de Registro Cargado');
	
	}
	onSubmit(form){

		this._userService.register(this.user).subscribe(
			response =>{
				if(response.user && response.user.id){
					console.log(response.user);
					this.status='success';
					//resetForm() disable the validations reset() don't
					form.resetForm();
					/*form.form.markAsPristine();
        			form.form.markAsUntouched();
        			form.form.updateValueAndValidity();
        			*/

				}else{
					this.status='error';
				}
			},
			error =>{
				this.status='error';
				console.log(<any>error);

				
			}
		);
	}
}