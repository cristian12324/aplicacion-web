import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,HttpClientModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuario:any = {};

  constructor(private http:HttpClient){

  }
  login(){
    let formularioValido:any = document.getElementById("loginForm");
    if(formularioValido.reportValidity()){
      this.servicioLogin().subscribe(
        (u:any) => {
          console.log(u)
          this.validarLogin(u)
        }
      )
    }
  }
  validarLogin(u:any){
    if(u){
      location.href="bienvenida";
      alert("usuario o password incorrecto")
    }
  }
  servicioLogin(){
  
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      }) 
    }
    return this.http.post(
      `http://localhost:8080/admin/buscar/${this.usuario.email}/${this.usuario.password}`,
      this.usuario,
      httpOptions

    );
  }
}
