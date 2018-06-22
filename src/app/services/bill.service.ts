import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Bill } from '../models/bill';

@Injectable()
export class BillService{
	public url:string;	
	
	constructor( public _http: HttpClient){
		this.url =GLOBAL.url;
	}
	
	getBill(id,token):Observable<any>{
		let headers = new HttpHeaders().set('Content-type','application/json').set('Authorization',token);
		return this._http.get(this.url+'bills/'+id,{headers: headers});	
	}
	
	getAllBills():Observable<any>{
		let headers = new HttpHeaders().set('Content-type','application/json');
		return this._http.get(this.url+'bills',{headers: headers});
	}
	createBill( bill:Bill,token ):Observable<any>{
		let params = JSON.stringify(bill);
		let nested = '{"bill":' + params+ '}'
		let headers = new HttpHeaders().set('Content-type','application/json').set('Authorization',token);
		return this._http.post(this.url+'bills',nested,{headers:headers});

		/*let params = JSON.stringify(meal);
		let nested = '{"meal":' + params+ '}'
		//console.log("Parametros", nested);
		
		let headers = new HttpHeaders().set('Content-type','application/json').set('Authorization',token);
		return this._http.post(this.url+'meals',nested,{headers:headers});*/


	}


	deleteBill(id,token){
		let headers = new HttpHeaders().set('Content-type','application/json').set('Authorization',token);
		return this._http.delete(this.url+'bills/'+id,{headers: headers});
	}

}