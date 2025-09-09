import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { RESTCountry } from '../interfaces/rest-countries.interface';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { CountryMapper } from '../mapper/country.mapper';
import type { ICountry } from '../interfaces/country.interface';
import { IRegion } from '../interfaces/region.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, ICountry[]>();
  private queryCacheCountry = new Map<string, ICountry[]>();
  private queryCacheRegion = new Map<IRegion, ICountry[]>();


  /* Search by capital */
  searchByCapital(query: string): Observable<ICountry[]> {
    query = query.toLowerCase();

    console.log(this.queryCacheCapital);

    /*     console.log(`Emmiting value of: "${query}"`);
        return of([]); Rebounce for automatic searches, without do many requests to the backend */
    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? []) /* return of(this.queryCacheCapital.get(query)!) Could be 'cause is already verified */
    }
    console.log(`Fetching from backend with value of: "${query}"`);


    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(map((resp) => CountryMapper.mapRESTCountryArrayToCountryArray(resp)),
        tap((countries) => this.queryCacheCapital.set(query, countries)),
        catchError(error => {
          console.log('Error fetching ', error);
          return throwError(() => new Error(`Country not found with this capital: "${query}"`))
        }));
  }


  /* Search by country */
  searchByCountry(query: string): Observable<ICountry[]> {
    query = query.toLowerCase();

    console.log(this.queryCacheCountry);


    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query) ?? [])
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
      .pipe(map((resp) => CountryMapper.mapRESTCountryArrayToCountryArray(resp)),
        tap((countries) => this.queryCacheCountry.set(query, countries)),
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

  /* Search by Region */
  searchByRegion(region: IRegion): Observable<ICountry[]> {

    console.log(this.queryCacheCountry);


    if (this.queryCacheCountry.has(region)) {
      return of(this.queryCacheCountry.get(region) ?? [])
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/region/${region}`)
      .pipe(map((resp) => CountryMapper.mapRESTCountryArrayToCountryArray(resp)),
        tap((countries) => this.queryCacheRegion.set(region, countries)),
        catchError(error => {
          console.log('Error fetching ', error);
          return throwError(() => new Error(`Country not found with: "${region}"`))
        }));
  }
}

