import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PhoneNumber } from '../models/phone-number.model';

@Injectable({
  providedIn: 'root'
})
export class PhoneNumberService {

  private apiUrl = 'https://telecomserviceapi.azurewebsites.net/api/phonenumber';

  constructor(private http: HttpClient) { }

  getAllPhoneNumbers() {
    return this.http.get<PhoneNumber[]>(this.apiUrl);
  }

  getPhoneNumbersByCustomerId(customerId: string) {
    return this.http.get<PhoneNumber[]>(`${this.apiUrl}/customer/${customerId}`);
  }

  addNewPhoneNumber(newPhoneNumber: PhoneNumber) {
    return this.http.post<PhoneNumber>(this.apiUrl, newPhoneNumber);
  }

  activatePhoneNumber(phoneNumberId: string) {
    return this.http.put<PhoneNumber>(`${this.apiUrl}/${phoneNumberId}`, null);
  }
}
