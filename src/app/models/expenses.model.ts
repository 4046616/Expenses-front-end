export class Expenses {
    person: [{
        name: String,
        expenses: [{
            title: String,  
            exp: number
        }],
        total: number;
    }];
    sum: number;
    equallyShare: number;
    owes: [{
        name: String,
        owe: number
    }]
}
  