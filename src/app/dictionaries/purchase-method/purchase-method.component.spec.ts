import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseMethodComponent } from './purchase-method.component';

describe('PurchaseMethodComponent', () => {
  let component: PurchaseMethodComponent;
  let fixture: ComponentFixture<PurchaseMethodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseMethodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
