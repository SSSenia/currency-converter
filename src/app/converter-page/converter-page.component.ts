import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICurrency } from '../shared/interfaces';
import { ParseApiService } from '../shared/parse-api.service';

@Component({
  selector: 'app-converter-page',
  templateUrl: './converter-page.component.html',
  styleUrls: ['./converter-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConverterPageComponent implements OnInit {

  public exchange$!: Observable<ICurrency[]>;

  constructor(
    private parseApiService: ParseApiService
  ) { }

  ngOnInit(): void {
    this.exchange$ = this.parseApiService.getExchange();
  }

}
