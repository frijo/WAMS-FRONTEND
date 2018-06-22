import {Http, Response} from '@angular/http';
import {Injectable, Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {ColumnComponent} from './column.component';
import { Meal } from '../../../models/meal';
@Component({
  selector: 'datatable',
  template: `<input type="text" class="form-control" *ngIf=enableFilter [(ngModel)]=query 
         (keyup)=filter() placeholder="Buscar" />
          <table class="table">
               <thead>
                 <tr class="tb-headers">
                   <th *ngFor="let column of columns">{{column.header}}</th>
                 </tr>
               </thead>
      	       <tbody class="tb-rows" *ngFor="let row of getData()" >
      	  	     <tr (click)="SayHI($Index)">
      	  	        <td  *ngFor="let column of columns">{{row[column.value]}}</td>
      	         </tr>
      	       </tbody>
  	     </table>
  `
})
export class DatatableComponent { 
 
  @Input() dataset;
  @Input() enableFilter = false;
  @Input() isVisible = true;
  query = "";
  filteredList;
  public mealToBill:any[];
  columns: ColumnComponent[] = [];
  constructor(
    
  ){
     
  }


  ngOnInit(){

     
  }

  @Output() sended = new EventEmitter();
  sendMeals($event){
    this.sended.emit({send:true});
  }

  addColumn(column){
    this.columns.push(column);
  }
  getData(){
    if(this.query !== ""){
      return this.filteredList;
    }else{
      return this.dataset;  
    }
  }
 
  filter(){
    this.filteredList = this.dataset.filter(function(el){
      var result="";
        for(var key in el){
          result+= el[key];
        }
        return result.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
    }.bind(this));
  }
  SayHI($Index){
    console.log("HI")
    /*if(this.mealToBill=="undefined" || this.mealToBill==null){

    }*/
  }
}