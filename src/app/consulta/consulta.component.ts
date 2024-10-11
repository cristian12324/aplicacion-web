import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-consulta',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule, MenuComponent],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.css'
})
export class ConsultaComponent {

  consulta: any[] = [];
  consultas: any = {}; 
  constructor(private http: HttpClient) {
    this.buscarConsultas();
}

buscarConsultas() {
  this.servicioBuscarConsultas().subscribe(
    (u: any) => {
      if (Array.isArray(u)) {
        this.consulta = u; 
      } else {
        console.error('La respuesta no es un array:', u);
        this.consulta = []; 
      }
    }
  );
}

  servicioBuscarConsultas(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/admin/buscar');
  }

  cargarConsultas() {
    this.http.get<any[]>('http://localhost:8080/admin/buscar').subscribe(data => {
      this.consultas = data;
    });
  }

  resetForm() {
    this.consultas = {}; 
  }
}