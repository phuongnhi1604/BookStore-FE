import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCartHistoryComponent } from './list-cart-history.component';

describe('ListCartHistoryComponent', () => {
  let component: ListCartHistoryComponent;
  let fixture: ComponentFixture<ListCartHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCartHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCartHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
