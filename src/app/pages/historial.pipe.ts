import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'historial'
})
export class HistorialPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
