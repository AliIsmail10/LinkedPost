import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UsersService } from '../../../shared/services/users/users.service';
import { NgIf } from '@angular/common';
import { UserData } from '../../../shared/interfaces/user-data';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {


  constructor(private _Router: Router,private _UsersService:UsersService) { }
  isLogin:boolean = false
  
  myImage!:UserData

  ngOnInit(): void {


    this._UsersService.loginState.subscribe(()=>{
      this.isLogin = this._UsersService.loginState.getValue() !== null
    
      if(this.isLogin){
         this._UsersService.GetLoggedUserData().subscribe(res=>{
          this.myImage = res.user.photo
        })
        
      }else{
      }
    })

    
  }

  logout(){
    this._UsersService.logout()
    this._Router.navigate(['/login'])
  }


}
