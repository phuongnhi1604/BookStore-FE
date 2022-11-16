import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IBook} from '../../model/book/ibook';

const URL_API = 'http://localhost:8080/api/book';
@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

  constructor(private http: HttpClient) { }

  getTopNewBook(): Observable<IBook[]> {
    return this.http.get<IBook[]>(URL_API);
  }

  getBookById(id: number): Observable<IBook> {
    return this.http.get<IBook>(`${URL_API}/${id}`);
  }

  getAllTopNewBook(page: number): Observable<IBook[]> {
    return this.http.get<IBook[]>(URL_API + '/latest?page=' + page);
  }

  getAllBookByCategoryId(id: number, page: number): Observable<IBook[]> {
    return this.http.get<IBook[]>(URL_API + `/category/${id}?page=` + page);
  }

  getAllBookByAuthorId(id: number): Observable<IBook[]> {
    return this.http.get<IBook[]>(URL_API + `/author/${id}`);
  }

  getAllBookSameAuthor(id: number): Observable<IBook[]> {
    return this.http.get<IBook[]>(URL_API + `/sameAuthor/${id}`);
  }

  getAllBookByPromotion(page: number): Observable<IBook[]> {
    return this.http.get<IBook[]>(URL_API + '/promotions');
  }
}
