import { Component, OnInit } from '@angular/core';
import {BookServiceService} from '../../service/book/book-service.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {IBook} from '../../model/book/ibook';
import {ICategory} from '../../model/book/icategory';
import {CategoryServiceService} from '../../service/book/category-service.service';

@Component({
  selector: 'app-book-list-category',
  templateUrl: './book-list-category.component.html',
  styleUrls: ['./book-list-category.component.css']
})
export class BookListCategoryComponent implements OnInit {
  bookList: IBook[] = [];
  category: ICategory;
  id: number;
  page = 1;
  size: number;
  totalElements: number;
  currentDate = new Date();
  constructor(private bookService: BookServiceService,
              private router: Router, private activatedRoute: ActivatedRoute,
              private categoryService: CategoryServiceService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.id = +param.get('id');
      this.getAllBookByCategoryId(this.id, this.page);
      this.getCategory(this.id);
    });
  }

  getAllBookByCategoryId(id: number, page: number) {
    this.page = page;
    this.bookService.getAllBookByCategoryId(id, this.page - 1).subscribe((data: any) => {
        this.bookList = data.content;
        this.size = data.size;
        this.totalElements = data.totalElements;
      },
      () => {
        this.page--;
        this.getAllBookByCategoryId(id, this.page);
      },
      () => {
      }
    );
  }
  getCategory(id: number) {
    return this.categoryService.getCategoryById(id).subscribe(data => {
      this.category = data;
    });
  }
}
