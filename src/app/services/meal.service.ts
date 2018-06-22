import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Meal } from '../models/meal';

@Injectable()
export class MealService{
	public url:string;	
	
	constructor( public _http: HttpClient){
		this.url =GLOBAL.url;
	}
	
	getMeal(id):Observable<any>{
		let headers = new HttpHeaders().set('Content-type','application/json');
		return this._http.get(this.url+'meals/'+id,{headers: headers});	
	}
	
	getAllMeals():Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json');
	
		return this._http.get(this.url+'meals');
	
	}
	
	createMeal( meal:Meal,token ):Observable<any>{
		let params = JSON.stringify(meal);
		let nested = '{"meal":' + params+ '}'
		//console.log("Parametros", nested);
		
		let headers = new HttpHeaders().set('Content-type','application/json').set('Authorization',token);
		return this._http.post(this.url+'meals',nested,{headers:headers});
	}

	updateMeal( meal:Meal,token ):Observable<any>{
		let params = JSON.stringify(meal);
		let nested = '{"meal":' + params+ '}'
		
		let headers = new HttpHeaders().set('Content-type','application/json').set('Authorization',token);
		return this._http.put(this.url+'meals/'+meal.id,nested,{headers:headers});	
	}
	deleteMeal(id,token){
		let headers = new HttpHeaders().set('Content-type','application/json').set('Authorization',token);
		return this._http.delete(this.url+'meals/'+id,{headers: headers});
	}
}