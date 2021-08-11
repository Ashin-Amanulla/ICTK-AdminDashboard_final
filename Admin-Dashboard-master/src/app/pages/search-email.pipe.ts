import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchEmail'
})
export class SearchEmailPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!value)return null;
    if(!args)return value;
    args = args.toLowerCase();

    if (args) {
      return value.filter((listing: any) => listing.Email.toLowerCase().includes(args));
  }
}
}
