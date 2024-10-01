import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule,NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-first-project';
  platillo: any[] = [];
  platillos: any = {}; 
  constructor(private http: HttpClient) {
    this.buscarPlatillo();

  }

  buscarPlatillo() {
    this.servicioBuscarPlatillo().subscribe(
      (u: any) => {
        if (Array.isArray(u)) {
          this.platillo = u; 
        } else {
          console.error('La respuesta no es un array:', u);
          this.platillo = []; 
        }
      }
    );
  }

  servicioBuscarPlatillo(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/platillo/buscar');
  }

  cargarPlatillo() {
    this.http.get<any[]>('http://localhost:8080/platillo/buscar').subscribe(data => {
      this.platillo = data;
    });
  }


  resetForm() {
    this.platillos = {}; 
  }
  borrarPlatillo(idplatillo: number) {
    this.http.delete(`http://localhost:8080/platillo/eliminar/${this.platillos.idplatillo}`, this.platillos)
      .subscribe({
        next: () => {
          this.cargarPlatillo();
        },
        error: (error) => console.error(`Error al eliminar la calificacion:`, error)
      });
}
  
  editarPlatillo(platillo: any) {
    this.platillos = { ...platillo }; 
  
  
  }

  nuevoPlatillo() {
    this.platillos = {}; 
  }
  guardarPlatillo() {
    if (this.platillos.idplatillo) {
      this.http.put(`http://localhost:8080/platillo/actualizar/${this.platillos.idplatillo}`, this.platillos)
        .subscribe(() => {
          this.cargarPlatillo();
          this.resetForm();
        });
    } else {
      this.http.post(`http://localhost:8080/platillo/guardar`, this.platillos)
        .subscribe(() => {
          this.cargarPlatillo();
          this.resetForm();
        });
    }
  }
}