import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-estimate',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './estimate.component.html',
  styleUrls: ['./estimate.component.css'],
  template: `
  <article>
  <img class="#" [src]="car">
  <section>
  <h2>Setup Estimate</h2>
  <form [formGroup]="applyForm">
    <label for="first-name"> First Name </label>
    <input id="first-name" type="text" formControlName="firstName">

    <label for="last-name"> Last Name </label>
    <input id="last-name" type="text" formControlName="lastName">

    <label for="phone-number"> Phone Number </label>
    <input id="phone-number" type="text" formControlName="phoneNumber">
    <button type="submit class="primary">Apply Now</button>

  </section>

  `
})
export class EstimateComponent {
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phoneNumber: new FormControl(''),
  })

}
