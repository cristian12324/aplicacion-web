import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent {
  platillosDisponibles: any[] = [];
  pedido: any = { detallePedidoList: [], total: 0 };
  platilloSeleccionado: any = {};
  cantidadSeleccionada: number = 1;

  constructor(private http: HttpClient) {
    this.cargarPlatillos(); 
  }

  cargarPlatillos() {
    this.http.get<any[]>('http://localhost:8080/platillo/buscar').subscribe({
      next: (data) => {
        console.log('Platillos cargados:', data);
        this.platillosDisponibles = data; 
      },
      error: (error) => {
        console.error('Error al cargar platillos:', error);
      }
    });
  }

  agregarPlatillo() {
    if (this.platilloSeleccionado && this.platilloSeleccionado.idplatillo) {
      const nuevoDetalle = {
        platilloIdplatillo: this.platilloSeleccionado.idplatillo,
        cantidad: this.cantidadSeleccionada,
        precio: this.platilloSeleccionado.precio
      };
      console.log('Nuevo detalle agregado:', nuevoDetalle);
      this.pedido.detallePedidoList.push(nuevoDetalle);
      this.calcularTotal(); 
      this.resetSeleccion(); 
    }
  }

  calcularTotal() {
    console.log('Detalles del pedido antes de calcular total:', this.pedido.detallePedidoList);
    this.pedido.total = this.pedido.detallePedidoList.reduce((acumulado: number, detalle: any) => {
      return acumulado + (detalle.precio * detalle.cantidad);
    }, 0);
  }

  guardarPedido() {
   
    if (this.pedido.detallePedidoList.length === 0) {
      console.error('No hay platillos en el pedido.');
      return; 
    }

    
    this.calcularTotal();

    console.log('Guardando pedido:', this.pedido);
    this.http.post('http://localhost:8080/pedido/guardar', this.pedido).subscribe({
      next: (response) => {
        console.log('Pedido guardado:', response);
        this.resetPedido(); 
      },
      error: (error) => {
        console.error('Error al guardar el pedido:', error);
      }
    });
  }

  resetPedido() {
    this.pedido = { detallePedidoList: [], total: 0 }; 
    this.resetSeleccion(); 
  }

  resetSeleccion() {
    this.platilloSeleccionado = {}; 
    this.cantidadSeleccionada = 1;
  }
}
