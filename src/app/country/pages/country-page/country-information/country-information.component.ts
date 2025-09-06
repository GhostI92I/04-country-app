import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ICountry } from '../../../interfaces/country.interface';
import { DecimalPipe, NgIf } from '@angular/common';

@Component({
  selector: 'country-information-page',
  imports: [DecimalPipe, NgIf],
  templateUrl: './country-information.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryInformationComponent {
  country = input.required<ICountry>();
}
