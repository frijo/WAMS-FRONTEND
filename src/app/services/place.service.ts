import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Place } from '../models/place';

@Injectable()
export class PlaceService{
	public url:string;	
	
	constructor( public _http: HttpClient){
		this.url =GLOBAL.url;
	}
	
	getPlace(id,token):Observable<any>{
		let headers = new HttpHeaders().set('Content-type','application/json').set('Authorization',token);
		return this._http.get(this.url+'places/'+id,{headers: headers});	
	}
	
	getAllPlaces():Observable<any>{
		let headers = new HttpHeaders().set('Content-type','application/json');
		return this._http.get(this.url+'places',{headers: headers});
	}
	createPlace( place:Place,token ):Observable<any>{
		let params = JSON.stringify(place);
		
		let headers = new HttpHeaders().set('Content-type','application/json').set('Authorization',token);
		return this._http.post(this.url+'places',params,{headers:headers});
	}


	deletePlace(id,token){
		let headers = new HttpHeaders().set('Content-type','application/json').set('Authorization',token);
		return this._http.delete(this.url+'places/'+id,{headers: headers});
	}

}