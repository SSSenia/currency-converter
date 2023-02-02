import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { ICurrency } from '../shared/interfaces';
import { ParseApiService } from '../shared/parse-api.service';

@Component({
  selector: 'app-converter-page',
  templateUrl: './converter-page.component.html',
  styleUrls: ['./converter-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConverterPageComponent implements OnInit {

  public firstSelectCurrency: FormControl = new FormControl('USD');
  public firstCurrency: FormControl = new FormControl(0);

  public secondSelectCurrency: FormControl = new FormControl('UAH');
  public secondCurrency: FormControl = new FormControl(0);

  public exchange$!: Observable<ICurrency[]>;
  private exchange: ICurrency[] = [];

  constructor(
    private parseApiService: ParseApiService
  ) { }

  ngOnInit(): void {
    this.exchange$ = this.parseApiService.getExchange().pipe(
      tap((exchange) => this.exchange = exchange));
  }

  public calculateFirst() {
    this.firstCurrency.setValue(
      Math.round(100 * this.secondCurrency.value
        * this.exchange.find(x => x.cc === this.secondSelectCurrency.value)!.rate
        / this.exchange.find(x => x.cc === this.firstSelectCurrency.value)!.rate)
      / 100);
  }

  public calculateSecond() {
    this.secondCurrency.setValue(
      Math.round(100 * this.firstCurrency.value
        * this.exchange.find(x => x.cc === this.firstSelectCurrency.value)!.rate
        / this.exchange.find(x => x.cc === this.secondSelectCurrency.value)!.rate)
      / 100);
  }
}
