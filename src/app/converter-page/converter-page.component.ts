import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription, tap } from 'rxjs';
import { ICurrency } from '../shared/interfaces';
import { ParseApiService } from '../shared/parse-api.service';

@Component({
  selector: 'app-converter-page',
  templateUrl: './converter-page.component.html',
  styleUrls: ['./converter-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConverterPageComponent implements OnInit {

  public selectCurrency: FormControl = new FormControl('USD');
  public customCurrency: FormControl = new FormControl(0);
  public hryvnia: FormControl = new FormControl(0);

  public exchange$!: Observable<ICurrency[]>;
  private exchange: ICurrency[] = [];

  constructor(
    private parseApiService: ParseApiService
  ) { }

  ngOnInit(): void {
    this.exchange$ = this.parseApiService.getExchange().pipe(
      tap((exchange) => this.exchange = exchange));
  }

  public calculateHryvnia() {
    if (+this.customCurrency.value)
      this.hryvnia.setValue(Math.round((this.customCurrency.value * this.exchange.find(x => x.cc === this.selectCurrency.value)!.rate) * 100) / 100);
    else this.resetValues();
  }

  public calculateCustomCurrency() {
    if (+this.hryvnia.value)
      this.customCurrency.setValue(Math.round((this.hryvnia.value / this.exchange.find(x => x.cc === this.selectCurrency.value)!.rate) * 100) / 100);
    else this.resetValues();
  }

  public resetValues() {
    this.customCurrency.setValue(0);
    this.hryvnia.setValue(0);
  }
}
