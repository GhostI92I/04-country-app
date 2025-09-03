import type { ICountry } from "../interfaces/country.interface";
import type { RESTCountry } from "../interfaces/rest-countries.interface";

export class CountryMapper {
  static mapRESTCountryToCountry(restCountry: RESTCountry): ICountry {
    return {
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      common: restCountry.translations['spa'].common ?? 'No Spanish Name', /* Buscamos en el rest countries la traducción */
      capital: restCountry.capital?.[0] || 'No Capital',
      population: restCountry.population
    };
  }

  static mapRESTCountryArrayToCountryArray(restCountries: RESTCountry[]): ICountry[]{
    return restCountries.map(this.mapRESTCountryToCountry);
  }
}
