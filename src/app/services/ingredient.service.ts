import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Ingredient } from '../models/ingredient';

@Injectable()
export class IngredientService{
	public url:string;	
	
	constructor( public _http: HttpClient){
		this.url =GLOBAL.url;
	}
	
	getIngredient(id):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json');
		return this._http.get(this.url+'ingredients/'+id,{headers: headers});	
	}
	
	getAllIngredients():Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json');
	//header("Access-Control-Allow-Origin: *");
		return this._http.get(this.url+'ingredients');
	//	return this._http.get("http://localhost:3000/api/v1/ingredients",{ headers: headers });
	}
	
	createIngredient( ingredient:Ingredient ):Observable<any>{
		let params = JSON.stringify(ingredient);
		let headers = new HttpHeaders().set('Content-Type','application/json');
		return this._http.post(this.url+'ingredients',params,{headers:headers});
	}

	updateIngredient( ingredient:Ingredient ):Observable<any>{
		let params = JSON.stringify(ingredient);
		let headers = new HttpHeaders().set('Content-Type','application/json');
		return this._http.put(this.url+'ingredients/'+ingredient.id,params,{headers:headers});	
	}
	deleteIngredient(id){
		let headers = new HttpHeaders().set('Content-Type','application/json');
		return this._http.delete(this.url+'ingredients/'+id,{headers: headers});
	}
}