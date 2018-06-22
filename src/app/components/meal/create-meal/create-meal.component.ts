import { Component, OnInit, EventEmitter, Input,Output } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { Meal } from '../../../models/meal';
import { Ingredient } from '../../../models/ingredient';
import { MealService } from '../../../services/meal.service';
import { GLOBAL } from '../../../services/global';
import { IngredientService } from '../../../services/ingredient.service';
import { UserService } from '../../../services/user.service';
import { FormControl,FormGroup, FormArray, FormBuilder,Validators } from '@angular/forms';
import { MealModel,IngredientsModel } from '../../../data-model';

@Component({
	selector: 'sel-new-meal',
	templateUrl: './create-meal.component.html',
	providers:[IngredientService,MealService,FormBuilder,UserService]

})
export class CreateMealComponent implements OnInit{
	public identity;
	public title:string;
	public meal: Meal;
	public status:string;
	public ingredients: Ingredient[];
	public checkedList: any[];
	public myForm: FormGroup;
	public is_disabled:boolean;
	public hideFieldQuantity:any[];
	public elementChecked:any[];
	private ingredientQuantityId:number
	public costPrice:number;
	public sellPrice:number;
	public quantityValue:any[];
	public token;
	public meals_type_list: string[];


	constructor(
	
		private _router: Router,
		private _route: ActivatedRoute,
		private _mealsService: MealService,
		private _ingredientesService: IngredientService,
		private _userService: UserService,
		private _fb: FormBuilder
	){
		this.title= 'Crear Platisllos y bebidas';
		this.is_disabled=true;
		this.meals_type_list=["Plato Fuerte","Bocas","Postres","Adicional","Refrescos/Gaseosas","Batidos","Cervezas","Licor"];
		this.meal = new  Meal();
		this.hideFieldQuantity=[];
		this.elementChecked=[];
		this.ingredientQuantityId=null;
		this.costPrice=0;
		this.sellPrice=0;
		//this.identity = this._userService.getIdentity();
		this.quantityValue=[];
		

	}
	ngOnInit(){

		console.log('Componete de crear Meals esta cargado...');
		this.identity = this._userService.getIdentity();
		this.token=this._userService.getToken();
		this.getIngredients();
		this.setMyForm();
						
	}
	@Output() sended = new EventEmitter();
	sendMeal($event){
		this.sended.emit({send:true});
	}
	
	setMyForm(){
		this.myForm = this._fb.group({
            name: ['', [Validators.required, Validators.minLength(5)]],
            meal_type: ['', [Validators.required]],
            meal_cost: ['', [Validators.required]],
            sell_price: ['', [Validators.required]],
            //image: ['', [Validators.required]],
		    recipe_description: [''],																																																																																																																				
            recipes_attributes: this._fb.array([])
        });
	}

    addIngredients(ingre,i) {
        console.log("Entro");
        this.ingredientQuantityId=null;
        
        if(ingre.target.checked){
        	const control = <FormArray>this.myForm.controls['recipes_attributes'];
	      	control.push(
	    		this._fb.group({
	      			quantity: [''],
	      			ingredient_id:[ingre.target.value],
	      			cost_price:['']
	     
	    		})
	  		)
	  		this.getCostPrice();
  			this.ingredientQuantityId =ingre.target.value;
  				
        }
        
     	
    }
    addQuantity(quantity,cost_price){
    	if(this.ingredientQuantityId!=null){
    		
    		const control = <FormArray>this.myForm.controls['recipes_attributes'];
        	const controls = this.myForm.value.recipes_attributes;
        	
        	var iteration=0;
        	for(const ctrl in controls){

        		if(controls[iteration].ingredient_id ==this.ingredientQuantityId ){

          			this.myForm.value.recipes_attributes[iteration].quantity = quantity.target.value;
          			//this.quantityValue[i]= quantity.target.value;
          			this.myForm.value.recipes_attributes[iteration].cost_price = cost_price;
        			this.getCostPrice();
        		}	
        		
        		iteration++
        	}
    	}
        
    }
    deleteIngredient($event,i){

       	if(!$event.target.checked){
    		const control = <FormArray>this.myForm.controls['recipes_attributes'];
        	const controls = this.myForm.value.recipes_attributes;
        	//this.quantityValue[i]=0;
        	var iteration=0;
        	for(const ctrl in controls){

	    		if(controls[iteration].ingredient_id ==$event.target.value ){
        			control.removeAt(iteration);
        			this.getCostPrice();
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
        	this.myForm.patchValue({
				meal_cost: this.costPrice
			
			});
    	this.getSellPrice();     
          	
    }
    getSellPrice(){
    	this.sellPrice = (this.costPrice * 1.90)
    	this.myForm.patchValue({
			sell_price: this.sellPrice
			
		});
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



	onSubmit(form,$event){
		
		console.log("Form Value submit",this.myForm.value);
		let model:Meal;
		model = this.prepareSaveMeal();
		
		this._mealsService.createMeal(model,this.token).subscribe(
			response =>{
				if(response.meal && response.meal.id){
					console.log(response);
					
					this.status='success';
					this.rebuildForm();
					this._router.navigate(['/meals']);
					this.getIngredients();
					this.hideFieldQuantity=[];
					
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
	//  	console.log("Convirtido recipes a array, prepareSaveMeal",recipesDeepCopy);


	  const saveMeal: MealModel = {

	    name: formModel.name as string,
	    meal_type: formModel.meal_type as string,
	    meal_cost: formModel.meal_cost as number,
	    sell_price: formModel.sell_price as number,
	    status: 'active' as string,
	    recipe_description: formModel.recipe_description as string,																																																																																																																				
        recipes_attributes: recipesDeepCopy

	    
	  };
	  //console.log("Array Final",saveMeal);
	  return saveMeal;
	}
	rebuildForm() {
    	this.myForm.reset();
   		this.setMyForm();
        this.getCostPrice();
  	}	

}