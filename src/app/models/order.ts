import { User } from './user';
import { Meal } from './meal';
import { Place } from './place';
export class Order{
	constructor(
		public id?:number,
		public order_number?:number,
		public order_date?:string,
		public client_name?:string,
		public client_phone?:string,
		public sales_taxes?:number,
		public total_tax?:number,
		public payment_type?:string,
		public user_id?:number,
		public created_at?:string,
		public updated_at?:string,
		public order_meals_attributes?: Meal[],
		public meals?:any[],
		public order_places_attributes?: Place[],
		public places?:any[],
		public show?:boolean,
		public show_meals?:boolean	
	
	){

	}

}
