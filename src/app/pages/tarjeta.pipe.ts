import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tarjeta'
})
export class TarjetaPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
