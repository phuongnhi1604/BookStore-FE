import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListCategoryComponent } from './book-list-category.component';

describe('BookListCategoryComponent', () => {
  let component: BookListCategoryComponent;
  let fixture: ComponentFixture<BookListCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookListCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
