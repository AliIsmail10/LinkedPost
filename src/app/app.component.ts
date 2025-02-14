import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { NavbarComponent } from "./layout/addation/navbar/navbar.component";
import { FooterComponent } from "./layout/addation/footer/footer.component";
import { FlowbiteService } from './shared/services/flowbite/flowbite.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent,NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'linkedPost';
  constructor(private spinner: NgxSpinnerService,private flowbiteService: FlowbiteService) {}


  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => {
      
    });

  }
  
}
