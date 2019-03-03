import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatButtonModule,
  MatInputModule,
  MatSelectModule,
  MatSliderModule,
} from '@angular/material';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { FiltersComponent } from './filters/filters.component';
import { HandComponent } from './hand/hand.component';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    FiltersComponent,
    HandComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
