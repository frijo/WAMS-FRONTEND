import { Component,OnInit } from '@angular/core';	
import { Router,ActivatedRoute,Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Login } from './login.interface';

@Component({
	selector: 'login',
	templateUrl:'./login.component.html',
	providers:[UserService]

})
export class LoginComponent implements OnInit{
	public title:string;
	public user: User;
	public status: string;
	public identity;
	public token;
	public login: Login;
	constructor( private _route: ActivatedRoute,
				 private _router: Router,
				 private _userService: UserService
	){
		this.title= 'Indentificate';
		this.user = new User();

	}
	ngOnInit(){

		console.log('Componente de Login Cargado');
		this.login={ 
			email: '',
      		password: ''
  		}
	}
	onSubmit(){

		//logear al ussario y conseguir sus datos
		console.log(this.login);
		this._userService.singup(this.login).subscribe(
			response =>{
				this.token = response.jwt;
				
				if(this.token.length <=0 ){
					this.status = 'error';
				}else{
					this.status = 'success';
					//PERSISTIR LOS DATOS DEL USUARIO
					localStorage.setItem('token',this.token);
					this.getCurrentUser(this.token);
					this._router.navigate(['/']);
				}

		
			},error =>{
				var errorMessage =<any>error;
				console.log(errorMessage);
				if(errorMessage !=null){
					this.status = 'error';
				}
			}
		);
	}
	getCurrentUser(token){
		this._userService.getCurrentUser(token).subscribe(
			response =>{
				this.identity = response.user;
				
				if(!this.identity || !this.identity.id){
					this.status = 'error';
				}else{
					localStorage.setItem('identity',JSON.stringify(this.identity));
					this.status = 'success';
					
				}

			},error =>{
				var errorMessage =<any>error;
				console.log(errorMessage);
				if(errorMessage !=null){
					this.status = 'error';
				}
			}
		);
	}
	
}