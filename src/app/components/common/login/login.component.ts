import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserAPIService } from 'src/app/services/user-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private fb: FormBuilder,private userApi:UserAPIService,private snackBar: MatSnackBar) {}
  submitted: boolean = false;
  hide: boolean = true;
  displayError!:string;
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern('^[^ ][a-z.-_0-9]+@[a-z0-9]+\\.[a-z]{2,15}')]],
    password: ['', Validators.required],
  });
  get AllControls() {
    return this.loginForm.controls;
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000, // Duration in milliseconds
    });}
 

  onSubmit(data: any) {
    this.submitted = true;
    if(data.status==='VALID'){
      const{email,password}=data.value;
      const credentials= {email,password};
      this.userApi.login(credentials).subscribe((response)=>{
        if(response.status!=="OK" &&response.message){
          this.displayError= response.message;
        }
      })
      

    }
    

  }
  togglePasswordVisibility(event:Event):void{
    event.preventDefault();
    this.hide=!this.hide;

  }
}
