import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'modifyTable'
})
export class ModifyTablePipe implements PipeTransform {

  transform(items: any, filter: any[]): any {

    let filterKeys = Object.keys(filter);

    if (!items || !filter) {
      return items;
    }

    return items.filter(item => {
      return filterKeys.some((keyName) => {
        return new RegExp(filter[keyName], 'gi').test(item.key) || filter[keyName] === "";
      });
    });

  }
}
