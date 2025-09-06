import type { ICountry } from "../interfaces/country.interface";
import type { RESTCountry } from "../interfaces/rest-countries.interface";

export class CountryMapper {
  static mapRESTCountryToCountry(restCountry: RESTCountry): ICountry {
    return {
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.translations['spa'].common ?? 'No Spanish Name', /* Buscamos en el rest countries la traducción */
      official: restCountry.translations['spa']?.official ?? 'No official name',
      capital: restCountry.capital?.[0] || 'No Capital',
      population: restCountry.population,
      area: restCountry.area.toString(),
      region: restCountry.region,
      latlng: restCountry.latlng as [number, number] || undefined,
    };
  }

  static mapRESTCountryArrayToCountryArray(restCountries: RESTCountry[]): ICountry[]{
    return restCountries.map(this.mapRESTCountryToCountry);
  }
}
