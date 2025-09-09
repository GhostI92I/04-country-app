import { ChangeDetectionStrategy, Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { firstValueFrom, of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryPageComponent {

  CountryService = inject(CountryService);

  ActivatedRoute = inject(ActivatedRoute);
  router = inject(Router)

  queryParam = this.ActivatedRoute.snapshot.queryParamMap.get('query') ?? '';


  query = signal(this.queryParam);

  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      console.log({ query: request.query });


      if (!request.query) return of([]);

      this.router.navigate(['/country/by-country'], {
        queryParams: { query: request.query }
      })

      return this.CountryService.searchByCountry(request.query)
    }
  })

  /* countryResource = resource({
    request: () => ({ query: this.query() }),
    loader: async ({ request }) => {
      if (!request.query) return [];

      // Take the first value of the Observable
      return await firstValueFrom(
        this.CountryService.searchByCountry(request.query)
      )
    }
  }) */
}
