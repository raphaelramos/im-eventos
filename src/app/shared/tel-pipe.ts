import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'tel'})
export class TelPipe  implements PipeTransform {
        transform(value: string): any {
                if (!value) { return value; }
                value = value.replace(/\D/g, '');
                value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
                value = value.replace(/(\d)(\d{4})$/, '$1-$2');
                return value;
        }
}
