import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Order } from '../models/order';

@Injectable()
export class OrderService{
	public url:string;	
	
	constructor( public _http: HttpClient){
		this.url =GLOBAL.url;
	}
	
	getOrder(id,token):Observable<any>{
		let headers = new HttpHeaders().set('Content-type','application/json').set('Authorization',token);
		return this._http.get(this.url+'orders/'+id,{headers: headers});	
	}
	
	getAllOrders():Observable<any>{
		let headers = new HttpHeaders().set('Content-type','application/json');
		return this._http.get(this.url+'orders',{headers: headers});
	}
	createOrder( order:Order,token ):Observable<any>{
		let params = JSON.stringify(order);
		
		let headers = new HttpHeaders().set('Content-type','application/json').set('Authorization',token);
		return this._http.post(this.url+'orders',params,{headers:headers});
	}


	deleteOrder(id,token){
		let headers = new HttpHeaders().set('Content-type','application/json').set('Authorization',token);
		return this._http.delete(this.url+'orders/'+id,{headers: headers});
	}

}