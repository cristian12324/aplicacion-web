import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario: any = {};

  constructor(private http: HttpClient) {
    let usuario = localStorage.getItem("usuario");
    if (usuario) {
      location.href = "bienvenida"; 
    }
  }

  login() {
    let formularioValido: any = document.getElementById("loginForm");
    if (formularioValido.reportValidity()) {
      this.servicioLogin().subscribe(
        (u: any) => {
          this.validarLogin(u);
        },
        (error) => {
          console.error("Error en el login", error);
          alert("Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo.");
        }
      );
    }
  }

  validarLogin(u: any) {
    console.log("Datos del usuario:", u); 
    if (u) {
      let t = JSON.stringify(u);
      localStorage.setItem("usuario", t);
      location.href = "bienvenida";
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  }
  
  

  servicioLogin() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(
      `http://localhost:8080/admin/buscar/${this.usuario.email}/${this.usuario.password}`,
      this.usuario,
      httpOptions
    );
  }
}

