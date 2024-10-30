import { CommonModule, NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-platillo',
  standalone: true,
  imports: [FormsModule, NgFor, HttpClientModule, CommonModule, MenuComponent],
  templateUrl: './platillo.component.html',
  styleUrls: ['./platillo.component.css']
})
export class PlatilloComponent {
  title = 'my-first-project';
  platillo: any[] = []; 
  platillos: any = { platilloIngredienteLista: [] }; 
  ingredientes: any[] = []; 
  ingredienteSeleccionado: any = {}; 
  imageBase64: string = ''; 

  constructor(private http: HttpClient) {
    this.buscarPlatillo();
    this.buscarIngrediente(); 
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
    this.ingredienteSeleccionado = {}; 
    this.imageBase64 = ''; 
  }

  borrarPlatillo(idplatillo: number) {
    this.http.delete(`http://localhost:8080/platillo/eliminar/${idplatillo}`)
      .subscribe({
        next: () => {
          this.cargarPlatillo();
          this.resetForm();
        },
        error: (error) => console.error(`Error al eliminar el platillo:`, error)
      });
  }

  editarPlatillo(platillo: any) {
    this.platillos = { ...platillo }; 
  }

  buscarIngrediente() {
    this.http.get<any[]>('http://localhost:8080/ingredientes/buscar').subscribe(data => {
      this.ingredientes = data; 
    });
  }

  agregarIngrediente() {
    if (this.ingredienteSeleccionado && this.ingredienteSeleccionado.idingrediente) {
      this.platillos.platilloIngredienteLista.push({
        ingredienteIdIngrediente: this.ingredienteSeleccionado.idingrediente,
        ingrediente: this.ingredienteSeleccionado.nombre,
        cantidad: 1 
      });
      console.log(this.platillos.platilloIngredienteLista);
  
      this.ingredienteSeleccionado = {};
    }
  }
  imagenSeleccionada(event: any) {
    const file: File = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.imageBase64 = reader.result as string;
        console.log('Imagen Base64:', this.imageBase64); 
        this.platillos.foto = this.imageBase64;
      };
      reader.readAsDataURL(file);
    }
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
      this.http.post(`http://localhost:8080/platillo/guardar`, this.platillos)
        .subscribe(() => {
          this.cargarPlatillo();
          this.resetForm();
        });
    }
  }
}  

