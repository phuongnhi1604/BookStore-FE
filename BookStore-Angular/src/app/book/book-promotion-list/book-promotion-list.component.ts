import {Component, OnInit} from '@angular/core';
import {IBook} from '../../model/book/ibook';
import {BookServiceService} from '../../service/book/book-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-book-promotion-list',
  templateUrl: './book-promotion-list.component.html',
  styleUrls: ['./book-promotion-list.component.css']
})
export class BookPromotionListComponent implements OnInit {
  bookList: IBook[] = [];
  page = 1;
  size: number;
  totalElements: number;

  constructor(private bookService: BookServiceService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getAllBookByPromotion(this.page);
  }

  getAllBookByPromotion(page: number) {
    this.page = page;
    this.bookService.getAllBookByPromotion(this.page - 1).subscribe((data: any) => {
        this.bookList = data.content;
        this.size = data.size;
        this.totalElements = data.totalElements;
      },
      () => {
        this.page--;
        this.getAllBookByPromotion(this.page);
      },
      () => {
      }
    );
  }

}
