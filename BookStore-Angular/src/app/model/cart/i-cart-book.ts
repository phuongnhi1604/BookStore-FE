import {ICart} from './i-cart';
import {IBook} from '../book/ibook';

export interface ICartBook {
  cartBookId?: number;
  cartId?: ICart;
  bookId?: IBook;
}
