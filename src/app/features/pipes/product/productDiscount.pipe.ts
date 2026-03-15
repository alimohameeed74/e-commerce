import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productDiscount',
})
export class ProductDiscountPipe implements PipeTransform {
  transform(price: number, priceAfterDiscount: number = 0): string {
    const diff = price - priceAfterDiscount;
    const percentage = (diff / price) * 100;
    return `-${Math.round(percentage)}%`;
  }
}
