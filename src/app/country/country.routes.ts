import { Routes } from '@angular/router';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { CountryLayoutPageComponent } from './layouts/country-layout-page/country-layout-page.component';

export const countryRoutes: Routes = [

  {
    path: '',
    component: CountryLayoutPageComponent,
    children: [
      {
        path: 'by-capital',
        component: ByCapitalPageComponent
      },
      {
        path: '**',
        redirectTo: 'by-capital'
      }
    ]
  }
];

export default countryRoutes;
