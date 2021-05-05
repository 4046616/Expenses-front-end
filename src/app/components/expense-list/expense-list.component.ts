import { Component, Input, OnInit } from '@angular/core';
import { Expenses } from 'src/app/models/expenses.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {
  @Input() expenseList: any;
  constructor() {
   }

  ngOnInit(): void {
    
  }

}
