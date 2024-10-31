import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuetzalesPipe } from '../quetzales.pipe';

@Component({
  selector: 'app-consulta-pedidos',
  standalone: true,
  imports: [CommonModule, FormsModule,QuetzalesPipe],
  templateUrl: './consulta-pedidos.component.html',
  styleUrls: ['./consulta-pedidos.component.css']
})
export class ConsultaPedidosComponent implements OnInit {
  pedidos: any[] = [];
  nuevoEstado: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos(): void {
    this.http.get<any[]>('http://localhost:8080/pedido/buscar').subscribe({
      next: (data) => {
        this.pedidos = data;
        console.log('Pedidos cargados:', this.pedidos);
      },
      error: (error) => {
        console.error('Error al cargar pedidos:', error);
      }
    });
  }

  eliminarPedido(idpedido: number): void {
    this.http.delete(`http://localhost:8080/pedido/eliminar/${idpedido}`).subscribe({
      next: () => {
        console.log(`Pedido ${idpedido} eliminado con éxito.`);
        this.cargarPedidos();
      },
      error: (error) => {
        console.error('Error al eliminar el pedido:', error);
      }
    });
  }

  actualizarEstado(idpedido: number): void {
    this.http.put(`http://localhost:8080/pedido/actualizar/${idpedido}`, this.nuevoEstado).subscribe({
      next: () => {
        console.log(`Estado del pedido ${idpedido} actualizado a ${this.nuevoEstado}.`);
        this.cargarPedidos();
      },
      error: (error) => {
        console.error('Error al actualizar el estado:', error);
      }
    });
  }
}
