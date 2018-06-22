import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Router,CanActivate } from '@angular/router';

@Injectable()
export class SessionGuardAdmin implements CanActivate{
	constructor(private _router:Router, private _userService: UserService){
		console.log("Entro A SessionGuardAdmin");
	}
	canActivate():boolean {
		let identity = JSON.parse(localStorage.getItem('identity'));
		//console.log("dentro de Session service",identity);
		if(identity && (identity.id && identity.role=="Admin")){
			 return true;
		}else{
			if(identity){
				this._router.navigate(['/']);
				return false;
			}else{
				this._router.navigate(['/login']);
				return false;
			}
			
		}
	}
}