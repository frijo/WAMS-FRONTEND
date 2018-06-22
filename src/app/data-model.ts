export class MealModel {
  id?:number;
  name:string;
  meal_type:string;
  meal_cost:number
  sell_price:number;
  status:string;
  recipe_description:string;
  recipes_attributes: IngredientsModel[];
}

export class IngredientsModel {
  quantity:number;
  ingredient_id:number;
 

}

