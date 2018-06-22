import { Component, OnInit, OnChanges,SimpleChanges,Input,ViewChild } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { Order } from '../../../models/order';
import { Meal } from '../../../models/meal';
import { Bill } from '../../../models/bill';
import { OrderService } from '../../../services/order.service';
import { MealService } from '../../../services/meal.service';
import { BillService } from '../../../services/bill.service';
import { UserService } from '../../../services/user.service';
import { GLOBAL } from '../../../services/global';
import {DatePipe} from '@angular/common';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { BillModel,MealsModel } from '../../../interfaces/bill.interface';
import { MealModel,IngredientsModel } from '../../../data-model';
import {Popup} from 'ng2-opd-popup';
import { NgbdModalBasic } from './modal-basic'
@Component({
	selector: 'sel-new-order',
	templateUrl: './create-order.component.html',
	providers:[OrderService,UserService,MealService]

})
export class CreateOrderComponent implements OnInit{
	
	public title:string;
	public order: Order;
	public bill:Bill;
	public meals:Meal[];
	public mealsToBill:Meal[]=[];
	public status:string;
	public token;
	public date:string;
	public identity;
	public colums:string[];
	public billColums:string[];
	public myForm: FormGroup;
	public searchString: string;
	public billSubTotal:number;
	public billTax:number;
	public billTotal:number;
	
	public paymentOptions:string[];
	public itsBigger:boolean;
	public newMeal:Meal;
	public newMealTotalPrice:number;
	public hiddeNewMealForms:boolean;
	public nameMeal2:string;
	public quantityMeal2:number;
	public sell_priceMeal2:number;
	public customer_payment:number;
	constructor(
	
		private _userService: UserService,
		private _router: Router,
		private _route: ActivatedRoute,
		private _orderService: OrderService,
		private _mealService: MealService,
		private _billService: BillService,
		private _fb: FormBuilder,
		
	){
		this.title= 'Crear Orden';
		this.customer_payment=0;
	}
	/*Input() customer_payment:number;
	
	ngOnChanges(changes: SimpleChanges) {
		this.checkPayment(this.customer_payment);
	}*/
	ngOnInit(){
		this.identity= this._userService.getIdentity();
		this.getMeals();
		this.token=this._userService.getToken();
		this.paymentOptions=["Efectivo","Tarjeta","Mixto"];
		this.colums= ["Descripcion","Tipo de Comida","Precio"];
		this.billColums= ["","Cant","Descripcion","Precio UND","Precio Total",""];
		
		this.billSubTotal=0;
		this.billTax=0;
		this.billTotal=0;
		this.newMealTotalPrice=0;
		
		this.setMyForm();
		this.hiddeNewMealForms=false;
		this.itsBigger=false;
		this.bill=this.prepareToSaveBill();

	}
	setMyForm(){
		this.myForm = this._fb.group({
            client_name: ['', [Validators.required, Validators.maxLength(50)]],
            client_phone: ['', Validators.maxLength(50)],
            payment_type: ['', Validators.required],
            user_id: [this.identity.id, Validators.required],
            customer_pay_with: ['', Validators.required],
            bill_meals_attributes: this._fb.array([]),
        });
	}
	changeValue(){
		this.hiddeNewMealForms=true;	
	}
	checkPayment(customer_payment=null){
		
		if( customer_payment >= this.billTotal && this.myForm.valid && this.billTotal >0 && this.mealsToBill.length >0){
			this.itsBigger=true;
			this.customer_payment=customer_payment;
		}
		else{
			this.itsBigger=false;	
		}
	}
	clearNewMealFields(){

		this.nameMeal2= ' ';
		this.quantityMeal2= 0;
		this.sell_priceMeal2=0;
		this.newMealTotalPrice=0;
		console.log("detalle",this.nameMeal2,"cantidad",this.quantityMeal2,"Precio de venta",this.sell_priceMeal2);
		this.hiddeNewMealForms=false;	
	}
	addMealToBill(meal,quantity=null){
		
				let repeated=false;
				for(let billMeal of this.mealsToBill){
					if(billMeal.id==meal.id){
						repeated=true;
						billMeal.quantity+=1;
						this.updateQuantityFromFormArray(meal);
					}				
				}
				if(repeated==false){
					if(quantity >=1 ){
						meal.quantity=quantity;
					}else{
						meal.quantity=1;
					}
					
					this.mealsToBill.push(meal);
					
					this.addMealsToFormArray(meal)	
				}
				this.billSubTotal=0;
				this.getBillTotals();
				this.checkPayment(this.customer_payment);
		
				
	}
	getBillTotals(){
		
		this.billTax=0;
		this.billTotal=0;
		for(let billMeal of this.mealsToBill){
			
			this.billSubTotal= this.billSubTotal+( billMeal.quantity* billMeal.sell_price);						
		}
		this.billTax = (this.billSubTotal*13)/100;
		this.billTotal=this.billSubTotal+this.billTax;
	}
	quantityChanged(meal,quantity){
		
		for(let billMeal of this.mealsToBill){
					if(billMeal.id==meal.id){
						
						billMeal.quantity= parseInt(quantity);
						this.updateQuantityFromFormArray(billMeal);
					}				
		}
		this.billSubTotal=0;
		this.getBillTotals();

	}
	newMealQuantityOrSellPriceChanged(quantity,sell_price){
		this.newMealTotalPrice = quantity*sell_price
		
	}

	initMeals(meal){
		return this._fb.group({
            meal_id: [meal.id],
            quantity: [meal.quantity],
            total: [(meal.quantity * meal.sell_price)],
        });
	}
	addMealsToFormArray(meal){
		const control = <FormArray>this.myForm.controls['bill_meals_attributes'];
        const mealCtrl = this.initMeals(meal);
        
        control.push(mealCtrl);
	}
	updateQuantityFromFormArray(meal){
		const control = <FormArray>this.myForm.controls['bill_meals_attributes'];
        	const controls = this.myForm.value.bill_meals_attributes;
        	
        	var iteration=0;
        	for(const ctrl in controls){

        		if(controls[iteration].meal_id == meal.id ){

          			this.myForm.value.bill_meals_attributes[iteration].quantity = meal.quantity;
          			this.myForm.value.bill_meals_attributes[iteration].total= meal.quantity*meal.sell_price;
          		}	
        		
        		iteration++
        	}
	}
	removeMealOfBill(meal,i: number) {
        
        const control = <FormArray>this.myForm.controls['bill_meals_attributes'];
        control.removeAt(i);
       // delete this.mealsToBill[meal];
        var index = this.mealsToBill.indexOf(meal);
		if (index > -1) {
		  this.mealsToBill.splice(index, 1);
		}
		this.billSubTotal=0;
		this.getBillTotals();
		this.checkPayment( this.customer_payment );
    }
	
	
	getMeals(){
		this._mealService.getAllMeals().subscribe(
			response=>{
				if(!response){
					this.status='error';
					
				}
				else{
					
					this.status='success';
					this.meals= response.meals;
					
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
	createNewMealToBill(name,quantity,sell_price){
		let model:Meal;
		model = this.prepareToSaveNewMeal(name,sell_price);
		this._mealService.createMeal(model,this.token).subscribe(
			response =>{
				if(response.meal && response.meal.id){
					console.log("Se creo nuevo plato en la facturacion",response);
					
					this.status='success';
					this.addMealToBill(response.meal,quantity);
					this.hiddeNewMealForms=false;	
					
					this.clearNewMealFields();
					
				}else{
					this.status='error';
					
				}
			},
			error =>{
				console.log(<any>error);

			}
		);
	}
	prepareToSaveNewMeal(mealName,mealSell_price):MealModel{
		
		const recipesDeepCopy: IngredientsModel[] = [];
		const saveMeal: MealModel = {

		    name: mealName as string,
		    meal_type: 'undefined' as string,
		    meal_cost: 0 as number,
		    sell_price: mealSell_price as number,
		    status: 'createdOnBill',
		    recipe_description: '' as string,
		    recipes_attributes:  recipesDeepCopy   
	  	};
	  return saveMeal;
	}

	
	public vuelto: number;
	public clientPayment: number;
	public billTotalPopup:number;
	public errorMessage:string;
	@ViewChild('popup1')popup1:Popup;
	@ViewChild('popup2')popup2:Popup;	
	save(myForm){
		let model:Bill;
		model = this.prepareToSaveBill();
		this.vuelto = model.customer_pay_with-model.total_tax;
		this.clientPayment=model.customer_pay_with; 
		console.log(this.vuelto);
		this.billTotalPopup= model.total_tax;
		this._billService.createBill(model,this.token).subscribe(
			response =>{
				if(response.bill && response.bill.id){
					
					this.status='success';
					//Configure options of Popup
					this.popup1.options = {
					    header: "El Vuelto Es",
					    color: "#5cb85c", // red, blue....
					    widthProsentage: 40, // The with of the popou measured by browser width
					    animationDuration: 0.5, // in seconds, 0 = no animation
					    showButtons: true, // You can hide this in case you want to use custom buttons
					    confirmBtnContent: "OK", // The text on your confirm button
					    cancleBtnContent: "OK", // the text on your cancel button
					    confirmBtnClass: "hidden", // your class for styling the confirm button
					    cancleBtnClass: "btn btn-default", // youa class for styling the cancel button
					    animation: "fadeInDown" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown'
					};
			 		//how Popup
			 		
					this.popup1.show(this.popup1.options);

					console.log("Factura :",response.bill);
					this.rebuildForm();
					this._router.navigate(['/new-order']);
					this.getMeals();
					this.bill= response.bill;
					

				}else{
					this.status='error';
					console.log("Eror!!",response)
					this._router.navigate(['/new-order']);
				}
			},
			error =>{
				this.status='error';
				console.log(<any>error);
				this.errorMessage=<any>error.error.message;
				console.log(this.errorMessage);
				
				this.popup2.options = {
					    header: "Error",
					    color: "red", // red, blue....
					    widthProsentage: 40, // The with of the popou measured by browser width
					    animationDuration: 0.5, // in seconds, 0 = no animation
					    showButtons: true, // You can hide this in case you want to use custom buttons
					    confirmBtnContent: "OK", // The text on your confirm button
					    cancleBtnContent: "OK", // the text on your cancel button
					    confirmBtnClass: "hidden", // your class for styling the confirm button
					    cancleBtnClass: "btn btn-default", // youa class for styling the cancel button
					    animation: "fadeInDown" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown'
					};
				this.popup2.show(this.popup2.options);
			}
		);

	}
	prepareToSaveBill(): BillModel {
	  	
	  	const formModel = this.myForm.value;
		const bill_meals_attributesDeepCopy: MealsModel[] = formModel.bill_meals_attributes.map(	    
	    	(bill_meals_attributes: MealsModel) => Object.assign({}, bill_meals_attributes)
	  	);

	  	const saveBill: BillModel = {

	    client_name: formModel.client_name as string,
	    client_phone: formModel.client_phone as string,
	    sale_tax: this.billTax as number,
	    total_tax: this.billTotal as number,
	    payment_type: formModel.payment_type as string,
	    user_id: formModel.user_id as number,
	    customer_pay_with:formModel.customer_pay_with,																																																																																																																				
        bill_meals_attributes: bill_meals_attributesDeepCopy

	    
	  };
	  //console.log("Array Final",saveBill);
	  return saveBill;
	}
	rebuildForm() {
    	this.myForm.reset();

    	this.mealsToBill=[];

    	this.billSubTotal=0;
		this.billTax=0;
		this.billTotal=0;
		this.setMyForm();
  	}
  	print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=800px,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <style>
          //........Customized style.......
          </style>
        </head>
    		<body onload="window.print();window.close()">
    			
    			${printContents}
    		</body>
      </html>
    `);
    popupWin.document.close();
}	

	
}