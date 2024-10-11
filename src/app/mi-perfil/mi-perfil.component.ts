import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [MenuComponent, FormsModule],
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent {
  usuario: any = {};
  admin: any = {};
  admins: any = [];
  password: any = {};

  constructor(private http: HttpClient) {
    let u: any = localStorage.getItem("usuario");
    this.usuario = JSON.parse(u) || {}; 
  }

  cargarAdmin() {
    this.http.get<any[]>('http://localhost:8080/admin/buscar').subscribe(data => {
      this.admins = data;
    });
  }

  editarPassword(password: any) {
    this.admin = { ...password };
  }

  resetForm() {
    this.admin = {};
  }

  guardarPassword() {
    if (this.admin && this.admin.idadministrador) { 
      this.http.put(`http://localhost:8080/admin/actualizar/${this.admin.idadministrador}`, this.admin)
        .subscribe(() => {
          this.cargarAdmin();
          this.resetForm();
        });
    } else if (this.admin) { 
      this.http.post(`http://localhost:8080/admin/guardar`, this.admin)
        .subscribe(() => {
          this.cargarAdmin();
          this.resetForm();
        });
    } else {
      console.log('No hay datos del administrador para guardar.');
    }
  }
  
  cambiarPassword() {
    if (this.usuario.password && this.password.newPassword) {
      if (this.usuario.idadministrador) {
        const body = {
          ...this.usuario,
          password: this.password.newPassword
        };
    
        this.http.put(`http://localhost:8080/admin/actualizar/${this.usuario.idadministrador}`, body)
          .subscribe({
            next: () => {
              console.log('Contraseña cambiada exitosamente.');
              alert("Contraseña cambiada exitosamente");
              this.resetForm();
            },
            error: (error) => {
              console.error('Error al cambiar la contraseña:', error);
            }
          });
      } else {
        console.log('ID de administrador no encontrado.');
      }
    } else {
      console.log('Por favor, introduce una nueva contraseña.');
    }
  }
}  