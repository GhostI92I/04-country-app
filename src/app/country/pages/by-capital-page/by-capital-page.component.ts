import { ChangeDetectionStrategy, Component, inject, resource, signal } from '@angular/core';
import { rxResource } from "@angular/core/rxjs-interop";
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { firstValueFrom, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCapitalPageComponent {

  CountryService = inject(CountryService)

  ActivatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.ActivatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = signal(this.queryParam);

  /* Resource with Observable RxJS */
  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      console.log({ query: request.query });


      if (!request.query) return of([]);

      this.router.navigate(['/country/by-capital'], {
        queryParams: { query: request.query }
      })

      return this.CountryService.searchByCapital(request.query)
    }
  })

  /* Resource with Promises */

  /*   countryResource = resource({
      request: () => ({ query: this.query() }),
      loader: async ({ request }) => {
        if (!request.query) return [];

         // Take the first value of the Observable
        return await firstValueFrom(
          this.CountryService.searchByCapital(request.query)
        )
      }
    })
   */

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

