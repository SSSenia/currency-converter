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
export class ConverterPageComponent implements OnInit, OnDestroy {

  public selectCurrency: FormControl = new FormControl('USD');
  public customCurrency: FormControl = new FormControl(0);
  public hryvnia: FormControl = new FormControl(0);

  public subToSelectCurrency!: Subscription;
  public subToCustomCurrency!: Subscription;
  public subToHryvnia!: Subscription;

  public exchange$!: Observable<ICurrency[]>;
  private exchange: ICurrency[] = [];

  constructor(
    private parseApiService: ParseApiService
  ) { }

  ngOnInit(): void {
    this.exchange$ = this.parseApiService.getExchange().pipe(
      tap((exchange) => this.exchange = exchange));

    this.subToSelectCurrency = this.selectCurrency.valueChanges.subscribe((value) => {
      const hryvnia: number = this.customCurrency.value * this.exchange.find(x => x.cc === value)!.rate
      if (Math.round(hryvnia * 10000) !== Math.round(this.hryvnia.value * 10000))
        this.hryvnia.setValue(hryvnia);
    })

    this.subToCustomCurrency = this.customCurrency.valueChanges.subscribe((value) => {
      const hryvnia: number = value * this.exchange.find(x => x.cc === this.selectCurrency.value)!.rate
      if (Math.round(hryvnia * 10000) !== Math.round(this.hryvnia.value * 10000))
        this.hryvnia.setValue(hryvnia);
    })

    this.subToHryvnia = this.hryvnia.valueChanges.subscribe((value) => {
      const customCurrency: number = value / this.exchange.find(x => x.cc === this.selectCurrency.value)!.rate;
      if (Math.round(customCurrency * 10000) !== Math.round(this.customCurrency.value * 10000))
        this.customCurrency.setValue(customCurrency);
    })

  }

  ngOnDestroy(): void {
    this.subToSelectCurrency.unsubscribe()
    this.subToCustomCurrency.unsubscribe()
    this.subToHryvnia.unsubscribe()
  }

}
