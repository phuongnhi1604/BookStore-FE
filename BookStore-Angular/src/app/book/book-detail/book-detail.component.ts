import { Component, OnInit } from '@angular/core';
import {BookServiceService} from '../../service/book/book-service.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {IBook} from '../../model/book/ibook';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: IBook;
  id: number;
  bookListByAuthor: IBook[] = [];
  promotionPrice: number;
  constructor(private bookService: BookServiceService,
              private activatedRoute: ActivatedRoute, private router: Router ) {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.id = +param.get('id');
      this.getBook(this.id);
    });
  }

  ngOnInit(): void {
    // this.promotionPrice = this.book.bookPrice - this.book.bookPrice * (this.book.bookPromotionId.promotion_percent * 0.01);
    // console.log(this.book.bookPromotionId.promotionId);
    this.getAllBookByAuthorId(this.book.bookAuthorId.authorId);
  }

  getBook(id: number) {
    return this.bookService.getBookById(id).subscribe((book) => {
      this.book = book;
    });
  }

  getAllBookByAuthorId(id: number) {
    return this.bookService.getAllBookByAuthorId(id).subscribe(data => {
      this.bookListByAuthor = data;
    });
  }

}
