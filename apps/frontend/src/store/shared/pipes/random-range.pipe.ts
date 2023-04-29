import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'randomRange',
  standalone: true,
})
export class RandomRangePipe implements PipeTransform {
  transform(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
