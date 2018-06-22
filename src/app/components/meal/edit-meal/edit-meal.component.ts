import { Component, OnInit, EventEmitter, Input,Output } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { Meal } from '../../../models/meal';
import { Ingredient } from '../../../models/ingredient';
import { MealService } from '../../../services/meal.service';
import { GLOBAL } from '../../../services/global';
import { IngredientService } from '../../../services/ingredient.service';
import { FormControl,FormGroup, FormArray, FormBuilder,Validators } from '@angular/forms';
import { MealModel,IngredientsModel } from '../../../data-model';
import { UserService } from '../../../services/user.service';

@Component({
	selector: 'sel-edit-meal',
	templateUrl: './edit-meal.component.html',
	providers:[UserService, IngredientService,MealService,FormBuilder]

})
export class EditMealComponent implements OnInit{
	
	public title:string;
	public meal: Meal;
	public status:string;
	public ingredients: Ingredient[];
	public checkedList: any[];
	public myForm: FormGroup;
	public is_disabled:boolean;
	public hideFieldQuantity:any[];
	public elementChecked:any[];
	private ingredientQuantityId:number;
	public mealIngredients:Array<any>;
	public token;
	public costPrice:number;
	public sellPrice:number;

	@Input('MealInfo') MealInfo: Meal;

	constructor(
		private _userService: UserService,
		private _router: Router,
		private _route: ActivatedRoute,
		private _mealsService: MealService,
		private _ingredientesService: IngredientService,
		private _fb: FormBuilder
	){
		this.title= 'Editar Plato';
		this.is_disabled=true;
		this.meal = new  Meal();
		this.hideFieldQuantity=[];
		this.elementChecked=[];
		this.ingredientQuantityId=null;
		this.mealIngredients=[];
		this.costPrice=0,
		this.sellPrice=0;
		this.myForm = this._fb.group({
			id:['', [Validators.required]],
            name: ['', [Validators.required, Validators.minLength(5)]],
            meal_type: ['', [Validators.required]],
            meal_cost: ['', [Validators.required]],
            sell_price: ['', [Validators.required]],
            //image: ['', [Validators.required]],
		    recipe_description: [''],																																																																																																																				
            recipes_attributes: this._fb.array([])
        });
        console.log(this.myForm);
	}
	ngOnInit(){

		console.log('Componete de editar Meals esta cargado...');
		
		this.getIngredients();
		this.getMeal(this.MealInfo.id);
		this.token=this._userService.getToken();
				
	}

	@Output() edited = new EventEmitter();
	sendMeal(){
		this.edited.emit({send:true});
	}
	setFormValues(){
		
		this.myForm.patchValue({
			id: this.meal.id,	
			name: this.meal.name,
			meal_type: this.meal.meal_type,
			meal_cost: this.meal.meal_cost,
			sell_price: this.meal.sell_price,
			recipe_description: this.meal.recipe_description
		});
		//console.log(this.meal.id);
		this.mealIngredients=[];

		this.meal.recipes.forEach(i=>{ 
		   this.mealIngredients.push(
		   {
		    "ingredient_id":i.ingredient_id,
		    "meal_id":i.meal_id,
		    "quantity":i.quantity
		   });
		});



		console.log("Set Ingredients Meals",this.mealIngredients);

	}

    addIngredients(ingre,i) {
        console.log("Entro");
        this.ingredientQuantityId=null;
        
        if(ingre.target.checked){
        	const control = <FormArray>this.myForm.controls['recipes_attributes'];
	      	control.push(
	    		this._fb.group({
	      			quantity: [0],
	      			ingredient_id:[ingre.target.value]
	     
	    		})
	  		)
  			this.ingredientQuantityId =ingre.target.value;
  				
        }
        
     	
    }
    addQuantity(quantity){
    	if(this.ingredientQuantityId!=null){
    		
    		const control = <FormArray>this.myForm.controls['recipes_attributes'];
        	const controls = this.myForm.value.recipes_attributes;
        	
        	var iteration=0;
        	for(const ctrl in controls){

        		if(controls[iteration].ingredient_id ==this.ingredientQuantityId ){

          			this.myForm.value.recipes_attributes[iteration].quantity = quantity.target.value;
        		}        		
        		iteration++
        	}
    	}
        
    }
    deleteIngredient($event,i){

       	if(!$event.target.checked){
    		const control = <FormArray>this.myForm.controls['recipes_attributes'];
        	const controls = this.myForm.value.recipes_attributes;
        	
        	var iteration=0;
        	for(const ctrl in controls){

	    		if(controls[iteration].ingredient_id ==$event.target.value ){
        			control.removeAt(iteration);
        		}	
        		
        		iteration++
        	}
    
    	}
    }
    getCostPrice(){
    		const controls = this.myForm.value.recipes_attributes;
        	
        	var iteration=0;
        	this.costPrice=0;
        	var quantity=0;
        	var cost_price=0;
        	for(const ctrl in controls){

        			
          			quantity=this.myForm.value.recipes_attributes[iteration].quantity ;
          			cost_price= this.myForm.value.recipes_attributes[iteration].cost_price;
        			this.costPrice = this.costPrice + (quantity*cost_price);
        		
        		iteration++
        	}
    	this.getSellPrice();     
          	
    }
    getSellPrice(){
    	this.sellPrice = (this.costPrice * 1.90)
    }


	getIngredients(){
	
		this._ingredientesService.getAllIngredients().subscribe(
			response=>{
				if(!response){
					console.log(response);
					
				}
				else{
					
					
					this.ingredients= response.ingredients;
					
					this.ingredients = this.ingredients.map(function(ingredient) {
					      ingredient.show = false;   
					      return ingredient;
					});
				
				}
			},
			error=>{
				var errorMessage = <any>error;
				console.log(errorMessage);
				
				if(errorMessage != null){
					this.status='error'
				}
			}
		);
	}
	removeIngredients(i: number) {
        const control = <FormArray>this.myForm.controls['recipes_attributes'];
        control.removeAt(i);
    }
	getMeal(id){

		this._mealsService.getMeal(id).subscribe(
			response =>{
				if(response.meal && response.meal.id){
					console.log(response);
					this.meal= response.meal;
					
					this.setFormValues();
				}else{
					
					console.log(response);
				}
			},
			error =>{
				console.log(<any>error);

			}
		);
	}
	onSubmit(form,$event){
		
		console.log("Form Value submit",this.myForm.value);
		let model:Meal;
		model = this.prepareSaveMeal();
		
		this._mealsService.updateMeal(model,this.token).subscribe(
			response =>{
				if(response.meal && response.meal.id){
					console.log(response);
					
					this.status='success';
					this.rebuildForm();
					this._router.navigate(['/meals']);
					this.getIngredients();
					this.hideFieldQuantity=[];
					console.log();
				}else{
					this.status='error';
					console.log(response);
					this._router.navigate(['/meals']);
				}
			},
			error =>{
				console.log(<any>error);

			}
		);
		console.log("Array a enviar al Service",model);


	}
	prepareSaveMeal(): MealModel {
	  	const formModel = this.myForm.value;
		const recipesDeepCopy: IngredientsModel[] = formModel.recipes_attributes.map(	    
	    	(recipes_attributes: IngredientsModel) => Object.assign({}, recipes_attributes)
	  	);
	  	console.log("Convirtido recipes a array, prepareSaveMeal",recipesDeepCopy);


	  const saveMeal: MealModel = {
	  	id:formModel.id as number,
	    name: formModel.name as string,
	    meal_type: formModel.meal_type as string,
	    meal_cost: formModel.meal_cost as number,
	    sell_price: formModel.sell_price as number,
	    status: '' as string,
	    recipe_description: formModel.recipe_description as string,																																																																																																																				
        recipes_attributes: recipesDeepCopy

	    
	  };
	  console.log("Array Final",saveMeal);
	  return saveMeal;
	}

	rebuildForm() {
    	this.myForm.reset();
  	}	

}