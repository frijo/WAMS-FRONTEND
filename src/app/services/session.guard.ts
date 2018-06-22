import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Router,CanActivate } from '@angular/router';

@Injectable()
export class SessionGuard implements CanActivate{
	constructor(private _router:Router, private _userService: UserService){
		console.log("Entro A Session");
	}
	canActivate():boolean {
		let identity = JSON.parse(localStorage.getItem('identity'));
		//console.log("dentro de Session service",identity);
		if(identity && identity.id){
			 return true;
		}else{
			this._router.navigate(['/login']);
			return false;
		}
	}
}