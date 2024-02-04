// example.component.ts (Angular)

import { Component } from '@angular/core';
import { CustomerService } from './customer.service';


@Component({
  selector: 'app-example',
  template: `
    <div>
      <h2>Create Customer</h2>
      <form (submit)="createCustomer()">
        <label for="name">Name:</label>
        <input type="text" id="name" ngModel="customerData.name" required>

        <label for="age">Age:</label>
        <input type="number" id="age" ngModel="customerData.age" required>

        <label for="car_make">Car Make:</label>
        <input type="string" id="make" ngmodel="customerData.car_make" required>

        <label for="car_model">Car Model:</label>
        <input type="string" id="model" ngmodel="customerData.car_model" required>

        <label for="car_year">Car Year:</label>
        <input type="string" id="year" ngmodel="customerData.car_year" required>

        <button type="submit">Create Customer</button>
      </form>
    </div>
  `,
})
export class customerComponent {
  customerData = { name: '', age: 0, car_make: '', car_model: '', car_year: 0 };

  constructor(private customerService: CustomerService) {}

  createCustomer() {
    this.customerService.createCustomer(this.customerData).subscribe(
      (response) => {
        console.log('Customer created:', response);
      },
      (error) => {
        console.error('Error creating customer:', error);
      }
    );
  }
}
