import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(){
    let u = localStorage.getItem("usuario");
    if(!u){
      location.href = "";
    }
  }
  logout() {
    localStorage.clear();
    location.href = "";
  }
}


