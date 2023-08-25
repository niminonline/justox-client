import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private fb: FormBuilder) {}
  submitted: boolean = false;
  hide: boolean = true;
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern('^[^ ][a-z.-_0-9]+@[a-z0-9]+\\.[a-z]{2,15}')]],
    password: ['', Validators.required],
  });
  get AllControls() {
    return this.loginForm.controls;
  }
  onSubmit(data: any) {
    this.submitted = true;
    console.log(data);
  }
  togglePasswordVisibility(event:Event):void{
    event.preventDefault();
    this.hide=!this.hide;

  }
}
