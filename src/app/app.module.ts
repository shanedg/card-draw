import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { FiltersComponent } from './filters/filters.component';
import { HandComponent } from './hand/hand.component';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    FiltersComponent,
    HandComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSelectModule,
    MatSliderModule,
  ],
  schemas: [
    // NO_ERRORS_SCHEMA
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
