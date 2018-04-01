
import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute,Params } from '@angular/router';
import { IngredientService } from './services/ingredient.service';
import { GLOBAL } from './services/global';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [IngredientService]
})
export class AppComponent implements OnInit, DoCheck{
  title = 'WAMS';
   ngOnInit(){

   }
   ngDoCheck(){
   	
   }
}
