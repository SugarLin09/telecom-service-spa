import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = 'https://telecomserviceapi.azurewebsites.net/api/customer';

  constructor(private http: HttpClient) { }

  getAllCustomers() {
    return this.http.get<Customer[]>(this.apiUrl);
  }
}
