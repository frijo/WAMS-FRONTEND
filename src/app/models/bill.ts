import { User } from './user';
import { Meal } from './meal';
import { Place } from './place';
export class Bill{
	constructor(
		public id?:number,
		public invoice_number?:number,
		public invoice_date?:string,
		public client_name?:string,
		public client_phone?:string,
		public sale_tax?:number,
		public total_tax?:number,
		public payment_type?:string,
		public user_id?:number,
		public customer_pay_with?:number,
		public created_at?:string,
		public updated_at?:string,
		public bill_meals_attributes?: Meal[],
		public meals?:any[],
		
		public show?:boolean,
		public show_meals?:boolean	
	
	){

	}

}
