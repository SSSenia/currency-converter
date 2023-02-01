import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ICurrency } from '../shared/interfaces';
import { ParseApiService } from '../shared/parse-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  private desiredCurrencies = [
    'USD','EUR','CNY','KZT','GBP'
  ]

  public exchange$!: Observable<ICurrency[]>;

  constructor(
    private parseApiService: ParseApiService
  ) { }

  ngOnInit(): void {
    this.exchange$ = this.parseApiService.getExchange().pipe(
      map((exchange)=>exchange.filter((currency)=> this.desiredCurrencies.find(x=>currency.cc === x))
    ));
  }

}