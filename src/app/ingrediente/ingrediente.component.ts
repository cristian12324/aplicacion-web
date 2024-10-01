import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-ingrediente',
  standalone: true,
  imports: [FormsModule, NgFor,  HttpClientModule, CommonModule],
  templateUrl: './ingrediente.component.html',
  styleUrl: './ingrediente.component.css'
})
export class IngredienteComponent {
  title = 'my-first-project';
  ingrediente: any[] = [];
  ingredientes: any = {}; 
  constructor(private http: HttpClient) {
    this.buscarIngrediente();

  }

  buscarIngrediente() {
    this.servicioBuscarIngrediente().subscribe(
      (u: any) => {
        if (Array.isArray(u)) {
          this.ingrediente = u; 
        } else {
          console.error('La respuesta no es un array:', u);
          this.ingrediente = []; 
        }
      }
    );
  }

  servicioBuscarIngrediente(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/ingredientes/buscar');
  }

  cargarIngrdiente() {
    this.http.get<any[]>('http://localhost:8080/ingredientes/buscar').subscribe(data => {
      this.ingrediente = data;
    });
  }


  resetForm() {
    this.ingredientes = {}; 
  }
  borrarIngrediente(idingrediente: number) {
    this.http.delete(`http://localhost:8080/ingredientes/eliminar/${this.ingredientes.idingrediente}`, this.ingredientes)
      .subscribe({
        next: () => {
          this.cargarIngrdiente();
        },
        error: (error) => console.error(`Error al eliminar la calificacion:`, error)
      });
}
  
  editarIngrediente(ingrediente: any) {
    this.ingredientes = { ...ingrediente }; 
  
  
  }

  nuevoIngrediente() {
    this.ingredientes = {}; 
  }
  guardarIngrediente() {
    if (this.ingredientes.idingrediente) {
      this.http.put(`http://localhost:8080/ingredientes/actualizar/${this.ingredientes.idingrediente}`, this.ingredientes)
        .subscribe(() => {
          this.cargarIngrdiente();
          this.resetForm();
        });
    } else {
      this.http.post(`http://localhost:8080/ingredientes/guardar`, this.ingredientes)
        .subscribe(() => {
          this.cargarIngrdiente();
          this.resetForm();
        });
    }
  }
}
