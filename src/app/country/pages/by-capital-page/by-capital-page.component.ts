import { ChangeDetectionStrategy, Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import type { ICountry } from '../../interfaces/country.interface';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCapitalPageComponent {

  CountryService = inject(CountryService)
  query = signal('');

  countryResource = resource({
    request: () => ({ query: this.query() }),
    loader: async ({ request }) => {
      if (!request.query) return [];

      return await firstValueFrom( /* Take the first value of the Observable */
        this.CountryService.searchByCapital(request.query)
      )
    }
  })


  /*  isLoading = signal(false);
   isError = signal<string | null>(null);
   countries = signal<ICountry[]>([]);


   onSearch(query: string) {
     if (this.isLoading()) return;

     this.isLoading.set(true);
     this.isError.set(null);

     console.log({ query });
     this.CountryService.searchByCapital(query)
       .subscribe({
         next: (countries) => {
           this.isLoading.set(false);
           this.countries.set(countries);

           console.log(countries);
         },
         error: (err) =>{
           console.log(err);
           this.isLoading.set(false);
           this.countries.set([]),
           this.isError.set(err);
         }
       });
       }*/
}

