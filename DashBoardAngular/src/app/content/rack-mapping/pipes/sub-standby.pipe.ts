import { Pipe, PipeTransform } from '@angular/core';
  /**
   *
   * Pipe to delete 'STANDBY' in a string
   * Used in html template to clean the value for rack BarCode
   *
   */
@Pipe({
  name: 'subStandby'
})
export class SubStandbyPipe implements PipeTransform {

  transform(value: string): string {
    if (!/^STANDBY$/.test(value)) {
      return value.replace(/STANDBY/g, '');
    }
    return value;
  }

}
