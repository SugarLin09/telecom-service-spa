import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhoneNumberListComponent } from './components/phone-number-list/phone-number-list.component';
import { HttpClientModule } from '@angular/common/http';
import { AddNewPhoneNumberDialogComponent } from './components/add-new-phone-number-dialog/add-new-phone-number-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PhoneNumberListComponent,
    AddNewPhoneNumberDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
