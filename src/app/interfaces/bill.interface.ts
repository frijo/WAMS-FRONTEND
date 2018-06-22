export class BillModel {
  id?:number;
  client_name?:string;
  client_phone?:string;
  sale_tax?:number;
  total_tax?:number;
  payment_type?:string;
  user_id?:number;  
  customer_pay_with?:number;
  bill_meals_attributes: MealsModel[];
}

export class MealsModel {
  quantity:number;
  meal_id:number;
  total: number;

}