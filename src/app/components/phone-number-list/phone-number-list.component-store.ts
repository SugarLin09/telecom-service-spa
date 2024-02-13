import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { PhoneNumber } from '../../models/phone-number.model';
import { PhoneNumberService } from '../../services/phone-number.service';
import { Observable, map, switchMap, withLatestFrom } from 'rxjs';
import { Customer } from '../../models/customer.model';
import uniqBy from 'lodash-es/uniqBy';

interface PhoneNumberComponentState {
  phoneNumbers: PhoneNumber[];
  customers?: Customer[];
  selectedCustomerId?: string;
}

const phoneNumberComponentInitialState: PhoneNumberComponentState = {
  phoneNumbers: []
}

@Injectable()
export class PhoneNumberListComponentStore extends ComponentStore<PhoneNumberComponentState> {

  constructor(private phoneNumberService: PhoneNumberService) {
    super(phoneNumberComponentInitialState);
  }

  /* SELECTORS */
  readonly phoneNumbers$ = this.select((state) => state.phoneNumbers);
  readonly customers$ = this.select((state) => state.customers);
  readonly selectedCustomerId$ = this.select((state) => state.selectedCustomerId);

  /* UPDATERS */
  readonly setPhoneNumbers = this.updater((state, phoneNumbers: PhoneNumber[]) => ({
    ...state,
    phoneNumbers
  }));

  readonly setCustomers = this.updater((state, customers: Customer[]) => ({
    ...state,
    customers
  }));

  readonly setSelectedCustomerId = this.updater((state, selectedCustomerId?: string) => ({
    ...state,
    selectedCustomerId
  }));

  /* EFFECTS */
  readonly getPhoneNumbers = this.effect((void$: Observable<void>) => 
    void$.pipe(
      withLatestFrom(this.selectedCustomerId$),
      map(([_, selectedCustomerId]) => {
        if(selectedCustomerId) {
          return this.phoneNumberService.getPhoneNumbersByCustomerId(selectedCustomerId);
        }
        return this.phoneNumberService.getAllPhoneNumbers();
      }),
      switchMap((service) => 
        service.pipe(
          withLatestFrom(this.select((state) => state.customers)),
          tapResponse(
            ([phoneNumbers, customers]) => {
              this.setPhoneNumbers(phoneNumbers);

              if(customers == undefined) {
                var customerList = phoneNumbers.map(phoneNumber => <Customer> { id: phoneNumber.customerId, name: phoneNumber.customerName });
                var uniqueCustomers = uniqBy(customerList, 'id');
                this.setCustomers(uniqueCustomers);
              }
            },
            (error) => console.error(error)
          )
        )
      )
    )
  )

  readonly activatePhoneNumber = this.effect((phoneNumberId$: Observable<string>) => 
    phoneNumberId$.pipe(
      switchMap((selectedCustomerId) => 
        this.phoneNumberService.activatePhoneNumber(selectedCustomerId).pipe(
          tapResponse(
            () => this.getPhoneNumbers(),
            (error) => console.error(error)
          )
        )
      )
    )
  )
}
