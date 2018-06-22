import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'bill-meals',
    templateUrl: 'bill-meals.component.html',
})
export class BillMealsComponent {
    @Input('group')
    public mealsForm: FormGroup;
}