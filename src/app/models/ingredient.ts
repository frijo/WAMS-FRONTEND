export class Ingredient{

	constructor(
		public id?: number,
		public name?: string,
		public unit_type?: string,
		public quantity?:number,
		public cost_price?:number,
		public avaible?:number,
		public created_at?: string,
		public updated_at?: string,
		public show?:boolean
	){
		
	}
}