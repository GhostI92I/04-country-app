import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { RESTCountry } from '../interfaces/rest-countries.interface';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
import { CountryMapper } from '../mapper/country.mapper';
import type { ICountry } from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);


  searchByCapital(query: string): Observable<ICountry[]> {
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(map((resp) => CountryMapper.mapRESTCountryArrayToCountryArray(resp)),
        catchError(error => {
          console.log('Error fetching ', error);
          return throwError(() => new Error(`Country not found with this capital: "${query}"`))
        }));
  }


  /* Search by country */
  searchByCountry(query: string): Observable<ICountry[]> {
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
      .pipe(map((resp) => CountryMapper.mapRESTCountryArrayToCountryArray(resp)),
        delay(2000),
        catchError(error => {
          console.log('Error fetching ', error);
          return throwError(() => new Error(`Country not found with: "${query}"`))
        }));
  }

  /* Search by Alpha Code */
  searchCountryByAlphaCode(code: string) {

    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`)
      .pipe(map((resp) => CountryMapper.mapRESTCountryArrayToCountryArray(resp)),
        map((countries) => countries.at(0)),
        catchError(error => {
          console.log('Error fetching ', error);
          return throwError(() => new Error(`Country not found with this code: "${code}"`))
        }));
  }
}
