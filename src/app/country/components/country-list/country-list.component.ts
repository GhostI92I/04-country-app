import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ICountry } from '../../interfaces/country.interface';

@Component({
  selector: 'country-list',
  imports: [],
  templateUrl: './country-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryListComponent {
  countries = input.required<ICountry[]>();
}
