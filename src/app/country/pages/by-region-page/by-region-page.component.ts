import { ChangeDetectionStrategy, Component, inject, linkedSignal, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { IRegion } from '../../interfaces/region.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

function validateQueryParam(queryParam: string): IRegion {
  queryParam = queryParam.toLowerCase();

  const validRegions: Record<string, IRegion> = {
    africa: 'Africa',
    americas: 'Americas',
    asia: 'Asia',
    europe: 'Europe',
    oceania: 'Oceania',
    antarctic: 'Antarctic',
  };
  return validRegions[queryParam] ?? 'Americas'
}

@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByRegionPageComponent {
  CountryService = inject(CountryService);

  public regions: IRegion[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];
  ActivatedRoute = inject(ActivatedRoute);
  router = inject(Router)

  queryParam = this.ActivatedRoute.snapshot.queryParamMap.get('region') ?? '';

  selectedRegion = linkedSignal<IRegion>(() => validateQueryParam(this.queryParam));

  countryResource = rxResource({
    request: () => ({ region: this.selectedRegion() }),
    loader: ({ request }) => {
      if (!request.region) return of([]);

      this.router.navigate(['/country/by-region'], {
        queryParams: { region: request.region }
      })

      return this.CountryService.searchByRegion(request.region)
    }
  });
}
