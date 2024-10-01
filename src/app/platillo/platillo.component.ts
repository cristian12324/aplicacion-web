import { CommonModule, NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-platillo',
  standalone: true,
  imports: [FormsModule, NgFor, HttpClientModule, CommonModule],
  templateUrl: './platillo.component.html',
  styleUrls: ['./platillo.component.css']
})
export class PlatilloComponent {
    title = 'my-first-project';
    platillo: any[] = [];
    platillos: any = { platilloIngredienteLista: [] };

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
      this.platillos = { platilloIngredienteLista: [] };
    }
  
    borrarPlatillo(idplatillo: number) {
      this.http.delete(`http://localhost:8080/platillo/eliminar/${idplatillo}`)
        .subscribe({
          next: () => {
            this.cargarPlatillo();
          },
          error: (error) => console.error(`Error al eliminar el platillo:`, error)
        });
    }
    
    editarPlatillo(platillo: any) {
      this.platillos = { ...platillo }; 
    }
  
    agregarIngrediente() {
      this.platillos.platilloIngredienteLista.push({});
    }
    

    nuevoPlatillo() {
      this.resetForm();
    }

    guardarPlatillo() {
      
      if (this.platillos.idplatillo) {
  
        this.http.put(`http://localhost:8080/platillo/actualizar/${this.platillos.idplatillo}`, this.platillos)
          .subscribe(() => {
            this.cargarPlatillo();
            this.resetForm();
          });
      } else {
  
        console.log(this.platillos)
        this.http.post(`http://localhost:8080/platillo/guardar`, this.platillos)
          .subscribe(() => {
            this.cargarPlatillo();
            this.resetForm();
          });
      }
    }
  }    