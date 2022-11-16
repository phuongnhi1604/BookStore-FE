import {Component, OnInit} from '@angular/core';
import {BookServiceService} from '../../service/book/book-service.service';
import {Router} from '@angular/router';
import {IBook} from '../../model/book/ibook';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  bookList: IBook[] = [];
  page = 1;
  size: number;
  totalElements: number;

  constructor(private bookService: BookServiceService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getAllTopNewBook(this.page);
  }

  getAllTopNewBook(page: number) {
    this.page = page;
    this.bookService.getAllTopNewBook(this.page - 1).subscribe((data: any) => {
        this.bookList = data.content;
        this.size = data.size;
        this.totalElements = data.totalElements;
      },
      () => {
        this.page--;
        this.getAllTopNewBook(this.page);
      },
      () => {
      }
    );
  }
}
