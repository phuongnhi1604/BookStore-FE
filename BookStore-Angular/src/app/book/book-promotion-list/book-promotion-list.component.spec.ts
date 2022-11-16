import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookPromotionListComponent } from './book-promotion-list.component';

describe('BookPromotionListComponent', () => {
  let component: BookPromotionListComponent;
  let fixture: ComponentFixture<BookPromotionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookPromotionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookPromotionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
