import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bienvenida',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule, MenuComponent],
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent {
  noticia: any[] = [];
  noticias: any = {}; 
  calificacion: any[] = [];
  calificaciones: any = {}; 
  imageBase64: string | undefined; 

  constructor(private http: HttpClient) {
    this.buscarAnuncios();
    this.buscarCalificaciones();
  }

  buscarAnuncios() {
    this.servicioBuscarAnuncios().subscribe(
      (u: any) => {
        if (Array.isArray(u)) {
          this.noticia = u; 
        } else {
          console.error('La respuesta no es un array:', u);
          this.noticia = []; 
        }
      }
    );
  }

  buscarCalificaciones() {
    this.servicioBuscarCalificacion().subscribe(
      (u: any) => {
        if (Array.isArray(u)) {
          this.calificacion = u; 
        } else {
          console.error('La respuesta no es un array:', u);
          this.calificacion = []; 
        }
      }
    );
  }

  servicioBuscarAnuncios(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/anuncios/buscar');
  }

  cargarAnuncios() {
    this.http.get<any[]>('http://localhost:8080/anuncios/buscar').subscribe(data => {
      this.noticia = data;
    });
  }

  servicioBuscarCalificacion(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/calificacion/buscar');
  }

  cargarCalificacion() {
    this.http.get<any[]>('http://localhost:8080/calificacion/buscar').subscribe(data => {
      this.calificacion = data;
    });
  }

  resetForm() {
    this.noticias = {}; 
    this.calificaciones = {};
    this.imageBase64 = undefined; 
  }

  borrarCalificacion(idcalificacion: number) {
    this.http.delete(`http://localhost:8080/calificacion/eliminar/${this.calificaciones.idcalificacion}`, this.calificaciones)
      .subscribe({
        next: () => {
          this.cargarCalificacion();
        },
        error: (error) => console.error(`Error al eliminar la calificacion:`, error)
      });
  }

  borrarAnuncios(idnoticia: number) {
    this.http.delete(`http://localhost:8080/anuncios/eliminar/${this.noticias.idnoticia}`, this.noticias)
      .subscribe({
        next: () => {
          this.cargarAnuncios();
          this.resetForm();
        },
        error: (error) => console.error(`Error al eliminar la noticia:`, error)
      });
  }

  editarAnuncio(anuncio: any) {
    this.noticias = { ...anuncio }; 
  }

  editarCalificacion(calificacion: any) {
    this.calificaciones = { ...calificacion };
  }

  nuevaCalificacion() {
    this.calificaciones = {}; 
  }

  imagenAnuncio(anuncio: any): string {
    return anuncio.imagen ? `data:image/jpeg;base64,${anuncio.imagen}` : '';
  }

  guardarAnuncio() {
   
    this.noticias.imagen = this.imageBase64?.replace(/^data:image\/[a-z]+;base64,/, '') || ''; 
    
    if (this.noticias.idnoticia) {
        this.http.put(`http://localhost:8080/anuncios/actualizar/${this.noticias.idnoticia}`, this.noticias)
            .subscribe(() => {
                this.cargarAnuncios();
                this.resetForm();
            }, error => {
                console.error(`Error al actualizar el anuncio:`, error);
            });
    } else {
        this.http.post(`http://localhost:8080/anuncios/guardar`, this.noticias)
            .subscribe(() => {
                this.cargarAnuncios();
                this.resetForm();
            }, error => {
                console.error(`Error al guardar el anuncio:`, error);
            });
    }
  }

  imagenSeleccionada(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
      
          this.imageBase64 = reader.result as string; 
          console.log('Imagen Base64:', this.imageBase64);
        } else {
          console.error('Error al leer el archivo de imagen.');
        }
      };
      reader.onerror = (error) => {
        console.error('Error al leer el archivo:', error);
      };
      reader.readAsDataURL(file);
    } else {
      console.error('No se seleccionó ningún archivo.');
    }
  }
}
