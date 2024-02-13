import { Component, OnDestroy, OnInit } from '@angular/core';
import { PhoneNumberListComponentStore } from './phone-number-list.component-store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddNewPhoneNumberDialogComponent } from '../add-new-phone-number-dialog/add-new-phone-number-dialog.component';
import { Subject, takeUntil } from 'rxjs';
import { PhoneNumber } from '../../models/phone-number.model';

@Component({
  selector: 'app-phone-number-list',
  templateUrl: './phone-number-list.component.html',
  providers: [PhoneNumberListComponentStore]
})
export class PhoneNumberListComponent implements OnInit, OnDestroy {

  phoneNumbers$ = this.phoneNumberListComponentStore.phoneNumbers$;
  customers$ = this.phoneNumberListComponentStore.customers$;
  selectedCustomerId$ = this.phoneNumberListComponentStore.selectedCustomerId$;
  destroy$ = new Subject<void>();

  constructor(private phoneNumberListComponentStore: PhoneNumberListComponentStore,
    private modalService: NgbModal) {}

  ngOnInit(): void {
    this.phoneNumberListComponentStore.getPhoneNumbers();
  }

  openAddNewPhoneDialog() {
    var modalRef = this.modalService.open(AddNewPhoneNumberDialogComponent);
    modalRef.componentInstance.onPhoneNumberAdded
    .pipe(takeUntil(this.destroy$))
    .subscribe(() => {
      this.phoneNumberListComponentStore.getPhoneNumbers();
      modalRef.close();
    })
  }

  onCustomerFilterChange(event: Event) {
    this.phoneNumberListComponentStore.setSelectedCustomerId((event.target as any).value);
    this.phoneNumberListComponentStore.getPhoneNumbers();
  }

  clearCustomerFilter() {
    this.phoneNumberListComponentStore.setSelectedCustomerId(undefined);
    this.phoneNumberListComponentStore.getPhoneNumbers();
  }

  activatePhoneNumber(phoneNumber: PhoneNumber) {
    this.phoneNumberListComponentStore.activatePhoneNumber(phoneNumber.id!);
    this.phoneNumberListComponentStore.getPhoneNumbers();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
