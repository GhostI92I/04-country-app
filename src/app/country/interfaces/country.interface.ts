export interface ICountry {
  cca2: string;
  flag: string;
  flagSvg: string;
  name: string;
  official?: string
  capital: string;
  population: number;
  area: string;
  region: string;
  latlng?: [number, number]
  currencys?: string[];
  symbol?: string;
  currencyName?: string;
}
