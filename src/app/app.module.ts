import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ConverterPageComponent } from './converter-page/converter-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ConverterPageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
