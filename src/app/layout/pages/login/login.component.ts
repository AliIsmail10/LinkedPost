import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../../shared/services/users/users.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {

  logSub!: Subscription;
  loginStateSub!: Subscription;
  constructor(private UsersService:UsersService,private _Router:Router,private toaster:ToastrService) {
    this.loginStateSub=this.UsersService.loginState$.subscribe((token)=>{
      if(token){
        this._Router.navigate(['/home'])
      }
    })

   }
  loginForm:FormGroup= new FormGroup({
    
    'email': new FormControl(null ,[Validators.required, Validators.email]),
    'password': new FormControl(null,[Validators.required ,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]),
  }) 


  onSubmit(){

    if(this.loginForm.invalid){
      return ;
    }
    this.logSub= this.UsersService.sendLogin(this.loginForm.value).subscribe({
      next: (res: any) => {

          
        
        this.toaster.success('login successfully')

      },
      error: (err: any) => {
        this.loginForm.reset();
        this.toaster.error("email or password incorrect")
      }
    })

  }

  ngOnDestroy(): void {
    this.logSub?.unsubscribe()
    this.loginStateSub?.unsubscribe()
  }

}
