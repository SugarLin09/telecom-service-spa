import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewPhoneNumberDialogComponent } from './add-new-phone-number-dialog.component';

describe('AddNewPhoneNumberDialogComponent', () => {
  let component: AddNewPhoneNumberDialogComponent;
  let fixture: ComponentFixture<AddNewPhoneNumberDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddNewPhoneNumberDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddNewPhoneNumberDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
