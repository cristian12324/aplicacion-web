import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'quetzales',
  standalone: true 
})
export class QuetzalesPipe implements PipeTransform {
  transform(value: number): string {
    return `Q. ${value.toFixed(2)}`;
  }
}

// let t: any;
 //for (t of tipos){
 // if(t.tipo == value){
  //  return t.nombre;
//  }
 // return "no existe"
//}