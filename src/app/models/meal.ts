import { Ingredient } from './ingredient';
export class Meal{

	constructor(
		public id?: number,
		public name?: string,
		public meal_type?: string,
	//	public image?: string,
		public meal_cost?:number,
		public sell_price?:number,
		public recipe_description?: string,
		public quantity?:number,		
		public created_at?: string,
		public updated_at?: string,
		public show?:boolean,
		public status?:string,
		public show_ingredients?:boolean,
		public recipes_attributes?: Ingredient[],
		public recipes?: any[]
	){
		
	}
}