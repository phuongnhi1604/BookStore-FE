import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListMoreComponent } from './book-list-more.component';

describe('BookListMoreComponent', () => {
  let component: BookListMoreComponent;
  let fixture: ComponentFixture<BookListMoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookListMoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
