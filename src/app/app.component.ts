import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

export class Person {
  constructor(public name: string, public age: number, public email: string) {}
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  authReactiveForm: FormGroup;

  name: string;
  age: number;
  email: string;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initAuthForm();
  }

  persons: Person[] = [];

  onSubmit() {
    const myControls = this.authReactiveForm.controls;

    if (this.authReactiveForm.invalid) {
      Object.keys(myControls).forEach((myControlName) =>
        myControls[myControlName].markAsTouched()
      );
    }

    this.persons.push(
      new Person(
        myControls.name.value,
        myControls.age.value,
        myControls.email.value
      )
    );
    this.authReactiveForm.reset();
  }

  isControlInvalid(myControlName: string): boolean {
    const myControl = this.authReactiveForm.controls[myControlName];
    const res = myControl.invalid && myControl.touched;
    return res;
  }

  private initAuthForm() {
    this.authReactiveForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/[A-z]/)]],
      age: ['', [Validators.required, Validators.pattern(/[0-9]/)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }
}
