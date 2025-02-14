import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../../shared/services/users/users.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; // For native date parsing
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {


  constructor(private _UsersService:UsersService,private _Router:Router) { }

// Adjusting form group to align with the interface UserData
registerForm: FormGroup = new FormGroup({
  name: new FormControl(null, [Validators.required]),  // Changed 'userName' to 'name'
  email: new FormControl(null, [Validators.required, Validators.email]),
  password: new FormControl(null, [
    Validators.required,
    Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'),
  ]),
  rePassword: new FormControl(null, [
    Validators.required,
    Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'),
  ]),
  dateOfBirth: new FormControl(null, [Validators.required]),
  gender: new FormControl(null, [Validators.required]),  
}, this.checkPassword);

onSubmit() {
  console.log(this.registerForm.status);  // Log the form status
  console.log(this.registerForm.value);   // Log the form values
  
  if (this.registerForm.invalid) {
    console.log('Form is invalid');
    return;
  }
  
  // Submit the form
  this._UsersService.sendRegister(this.registerForm.value).subscribe({
    next: (res) => {
      console.log('Success:', res);
      this._Router.navigate(['/login']);
    },
    error: (err) => {
      console.log('Error:', err);
    }
  });
}

  checkPassword(form:any){
 
    if(form.get("password").value === form.get("rePassword").value)
    { return null
    }
    else{
      return {"passwordMatch":true};
    }
  }
}
