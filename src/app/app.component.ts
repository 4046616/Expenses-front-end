import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Expenses } from './models/expenses.model';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  expenseForm: FormGroup;
  expenseList: any;
  sum: any = 0;
  equallyShare: any;
  eachPersonTotal: any;

  constructor(private fb: FormBuilder, private api: ApiService) {
    // form 
    this.expenseForm = this.fb.group({
      name: '',
      expenses: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    // get record 
    this.api.get().subscribe(
      (response: Expenses) => {
        this.expenseList = response;
      },
      (error) => {
        console.log(error);
      }
    )
  }
 
  get expenses() : FormArray {
    return this.expenseForm.get("expenses") as FormArray
  }
 
  newExpense(): FormGroup {
    return this.fb.group({
      title: '',
      exp: null
    });
  }
 
  addExpense() {
    // new field 
    this.expenses.push(this.newExpense());
  }
 
  removeExpense(i:number) {
    // remove field 
    this.expenses.removeAt(i);
  }
 
  onSubmit() {
    // get expenses from form 
    this.expenseList.person.push(this.expenseForm.value);
    // console.log(this.expenseForm.value)
    const control = <FormArray>this.expenseForm.controls['expenses'];
        for(let i = control.length-1; i >= 0; i--) {
            control.removeAt(i)
    }
    // calculate shares and total 
    this.calculateExpense();
    // reset form 
    this.expenseForm.reset();
    // update record 
    this.updateRecord();
  }

  updateRecord() {
    // post data 
    this.api.post(this.expenseList).subscribe(
      (response: any) => {
        if(response.success) {
          console.log('updated!');
        } else {
          console.log('not updated!');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  calculateExpense() {
    // calculate expenses 
    this.sum = 0;
    this.expenseList.owes = [];
    this.expenseList.person.forEach((element,index) => {
      this.eachPersonTotal = 0;
      element.expenses.forEach((expense) => {
        this.eachPersonTotal = this.eachPersonTotal + expense.exp
        // total expense 
        this.sum += expense.exp;
      });  
      element.total =this.eachPersonTotal;
    });
    // equal shares 
    this.expenseList.equallyShare = this.sum / this.expenseList.person.length;
    // sum 
    this.expenseList.sum = this.sum;

    // owe 
    this.expenseList.person.forEach((element,index) => {
      const owe  = this.expenseList.equallyShare - element.total;
      this.expenseList.owes.push({"name": element.name, "owe": owe});
    });
  }
}
 
