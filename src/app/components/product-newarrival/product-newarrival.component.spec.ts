import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductNewarrivalComponent } from './product-newarrival.component';

describe('ProductNewarrivalComponent', () => {
  let component: ProductNewarrivalComponent;
  let fixture: ComponentFixture<ProductNewarrivalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductNewarrivalComponent]
    });
    fixture = TestBed.createComponent(ProductNewarrivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
