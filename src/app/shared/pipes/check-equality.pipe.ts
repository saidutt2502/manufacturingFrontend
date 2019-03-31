import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkEquality'
})
export class CheckEqualityPipe implements PipeTransform {

  transform(value: any, key: any,keyValue:any): any {
    return value.filter(v => new RegExp(keyValue, 'gi').test(v[key])).slice(0, 10)
  }

}
