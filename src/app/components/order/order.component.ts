import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';
import {DatePipe} from '@angular/common';


@Component({
	selector: 'sel-order',
	templateUrl: './order.component.html',
	providers:[OrderService,UserService]

})
export class OrderComponent implements OnInit{
	
	public title:string;
	public order: Order;
	public orders:Order[];
	public status:string;
	public token;
	public date:string;
	constructor(
		private _userService: UserService,
		private _router: Router,
		private _route: ActivatedRoute,
		private _orderService: OrderService
	){
		this.title= 'Lista de Ordenes';
		let dp = new DatePipe('en-US' /* locale .. */);
	    this.date = dp.transform(new Date(), 'dd/MM/yyyy hh:mm');
	    console.log(this.date);		
	}
	ngOnInit(){
		this.getOrders();
		this.token= this._userService.getToken();
	}
	getOrders(){
	//	console.log('Entro en funcion getMeals');
		this._orderService.getAllOrders().subscribe(
			response=>{
				if(!response){
					this.status='error, no hay datos';
					
				}
				else{
					
					this.status='success';
					this.orders= response.orders;
					this.orders = this.orders.map(function(order) {
					      order.show = false;
					      order.show_meals = false;
					         
					      return order;
					});
					console.log(this.orders);
				}
			},
			error=>{
				var errorMessage = <any>error;
				console.log(error);
				
				if(errorMessage != null){
					this.status='error'
				}
			}
		);
	}
	deleteOrder(id){
		this._orderService.deleteOrder(id,this.token).subscribe(
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
		this.getOrders();
	}

	/*toggleVisibility(index: number){
		this.orders[index].show = !this.orders[index].show;
		
		//event.target.classList.toggle('visible');
	}*/
	


}