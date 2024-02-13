import { EventEmitter, Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Customer } from '../../models/customer.model';
import { CustomerService } from '../../services/customer.service';
import { Observable, switchMap } from 'rxjs';
import { PhoneNumber } from '../../models/phone-number.model';
import { PhoneNumberService } from '../../services/phone-number.service';

interface AddNewPhoneNumberDialogState {
  customers: Customer[];
}

const addNewPhoneNumberDialogInitialState: AddNewPhoneNumberDialogState = {
  customers: []
}

@Injectable()
export class AddNewPhoneNumberDialogComponentStore extends ComponentStore<AddNewPhoneNumberDialogState> {

  readonly onPhoneNumberAdded = new EventEmitter();

  constructor(private customerService: CustomerService, 
    private phoneNumberService: PhoneNumberService) {
    super(addNewPhoneNumberDialogInitialState);
  }

  /* SELECTORS */
  readonly customers$ = this.select((state) => state.customers);

  /* UPDATERS */
  readonly setCustomers = this.updater((state, customers: Customer[]) => ({
    ...state,
    customers
  }));

  /* EFFECTS */
  readonly getCustomers = this.effect((void$: Observable<void>) => 
    void$.pipe(
      switchMap(() => 
      this.customerService.getAllCustomers().pipe(
          tapResponse(
            (customers) => {
              this.setCustomers(customers);
            },
            (error) => console.error(error)
          )
        )
      )
    )
  )

  readonly addNewPhoneNumber = this.effect((data$: Observable<PhoneNumber>) => 
    data$.pipe(
      switchMap((data) => 
      this.phoneNumberService.addNewPhoneNumber(data).pipe(
          tapResponse(
            () => this.onPhoneNumberAdded.emit(),
            (error) => console.error(error)
          )
        )
      )
    )
  )
}
