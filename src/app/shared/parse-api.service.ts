import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { ICurrency } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class ParseApiService {

  private exchange!: ICurrency[];

  constructor(
    private http: HttpClient
  ) { }

  public getExchange(): Observable<ICurrency[]> {
    return this.exchange
      ? of(this.exchange)
      : this.http.get<ICurrency[]>('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
        .pipe(tap((exchange) => this.exchange = exchange));
  }
}
