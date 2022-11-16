import { Component, OnInit } from '@angular/core';
import {IBook} from '../../model/book/ibook';
import {BookServiceService} from '../../service/book/book-service.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent implements OnInit {
  bookList: IBook[] = [];
  page = 1;
  size: number;
  key: string;
  totalElements: number;
  constructor(private bookService: BookServiceService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.key = param.get('searchKey');
      this.searchBook(this.key, this.page);
    });
  }

  searchBook(key: string, page: number) {
    this.page = page;
    this.bookService.searchBook(key, this.page - 1).subscribe((data: any) => {
        this.bookList = data.content;
        this.size = data.size;
        this.totalElements = data.totalElements;
      },
      () => {
        this.page--;
        this.searchBook(key, this.page);
      },
      () => {
      }
    );
  }

}
