import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddNewPhoneNumberDialogComponentStore } from './add-new-phone-number-dialog.component-store';

@Component({
  selector: 'app-add-new-phone-number-dialog',
  templateUrl: './add-new-phone-number-dialog.component.html',
  providers: [AddNewPhoneNumberDialogComponentStore]
})
export class AddNewPhoneNumberDialogComponent implements OnInit {

  @Output() onPhoneNumberAdded = this.addNewPhoneNumberDialogComponentStore.onPhoneNumberAdded;

  formGroup!: FormGroup;

  customers$ = this.addNewPhoneNumberDialogComponentStore.customers$;

  constructor(private addNewPhoneNumberDialogComponentStore: AddNewPhoneNumberDialogComponentStore) {}

  ngOnInit(): void {
    this.addNewPhoneNumberDialogComponentStore.getCustomers();

    this.formGroup = new FormGroup({
      phoneNumber: new FormControl(null, Validators.required),
      customerId: new FormControl(null, Validators.required),
      active: new FormControl(false),
    })
  }

  onSubmit() {
    this.formGroup.markAllAsTouched();

    if (!this.formGroup.valid) {
      return;
    }

    this.addNewPhoneNumberDialogComponentStore.addNewPhoneNumber(this.formGroup.value);

  }

}
