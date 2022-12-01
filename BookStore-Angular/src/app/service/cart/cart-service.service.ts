import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ICartBook} from '../../model/cart/i-cart-book';
import {IBook} from '../../model/book/ibook';
import {ICart} from '../../model/cart/i-cart';

const URL_API = 'http://localhost:8080/api/cart';
@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  constructor(private http: HttpClient) { }

  findAllCartBook(accountId: number): Observable<ICartBook[]> {
    return this.http.get<ICartBook[]>(URL_API + '/list-cart-book?accountId=' + accountId);
  }

  updateQuantityCart(cartBook: ICartBook): Observable<void> {
    return this.http.put<void>(URL_API + '/update-quantity', cartBook);
  }

  addBook(accountId: number, book: IBook): Observable<void> {
    return this.http.post<void>(URL_API + '/add-book?accountId=' + accountId, book);
  }

  deleteBookCart(cartId: number): Observable<void> {
    return this.http.delete<void>(URL_API + '/cart-delete?cardId=' + cartId);
  }

  paymentCart(cartList: ICart[]): Observable<void> {
    return this.http.put<void>(URL_API + '/payment', cartList);
  }

  // book-detail
  findCartBookByBookId(accountId: number, bookId: number): Observable<ICartBook> {
    return this.http.get<ICartBook>(URL_API + '/cart-book-detail?accountId=' + accountId + '&bookId=' + bookId);
  }

  deleteManyBookCart(cartId: number[]): Observable<void> {
    return this.http.post<void>(URL_API + '/delete-many-book-cart/' , cartId);
  }

  findAllCartPayed(accountId: number, page: number): Observable<ICart[]> {
    return this.http.get<ICart[]>(URL_API + '/list-cart-history?accountId=' + accountId + '&page=' + page);
  }
}
