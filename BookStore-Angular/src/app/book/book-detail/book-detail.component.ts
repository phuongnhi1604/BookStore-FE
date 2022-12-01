import {Component, OnInit} from '@angular/core';
import {BookServiceService} from '../../service/book/book-service.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {IBook} from '../../model/book/ibook';
import {TokenStorageService} from '../../service/security/token-storage.service';
import {NotifierService} from 'angular-notifier';
import {CartServiceService} from '../../service/cart/cart-service.service';
import {HeaderComponent} from '../../header/header.component';
import {ICartBook} from '../../model/cart/i-cart-book';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: IBook;
  id: number;
  bookListByAuthor: IBook[] = [];

  accountId: number;
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showCustomer = false;
  userName: string;
  showHome = false;
  bookById: IBook = {};

  bookQuantity = 1;
  quantityCart = 0;
  constructor(private bookService: BookServiceService,
              private activatedRoute: ActivatedRoute,
              private cartService: CartServiceService,
              private notifier: NotifierService,
              private headerComponent: HeaderComponent,
              private router: Router,
              private tokenStorageService: TokenStorageService) {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.id = +param.get('id');
      this.bookService.getBookById(this.id).subscribe((book) => {
        this.book = book;
        this.bookById = book;
        this.bookService.getAllBookSameAuthor(this.book.bookAuthorId.authorId).subscribe(data => {
          this.bookListByAuthor = data;
        });
      });
    });
  }

  ngOnInit(): void {
    // kiểm tra đăng nhập
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      this.userName = this.tokenStorageService.getUser().account.username;
      this.roles = this.tokenStorageService.getUser().account.roles[0].roleName;
      // kiểm tra role
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showCustomer = this.roles.includes('ROLE_USER');

      console.log('roles: ' + this.roles);
    }
    this.accountId = this.tokenStorageService.getUser().account.accountId;
    this.getQuantityCart();
  }

  // thêm sách vào giỏ hàng
  addBook(bookAdd: IBook) {
    // lấy số lượng trong giỏ hàng
    this.getQuantityCart();

    // thêm vào giỏ hàng
    bookAdd.bookQuantity = this.bookQuantity;
    console.log(bookAdd);
    this.cartService.addBook(this.accountId, bookAdd).subscribe(() => {
    }, (error) => {
      this.notifier.notify('error', error.error);
      this.bookService.getBookById(this.id).subscribe((data: IBook) => {
        this.bookById = data;
      }, () => {
      }, () => {
      });
    }, () => {
      this.notifier.notify('success', 'Thêm sản phẩm vào giỏ hàng thành công.');
      (document.getElementById('input-quantity') as HTMLFormElement).value = '1';
      this.headerComponent.getQuantityCart();

      this.bookService.getBookById(this.id).subscribe((data: IBook) => {
        this.bookById = data;
      }, () => {
      }, () => {
      });
    });
  }
  loginToCart() {

    this.notifier.notify('default', 'Vui lòng đăng nhập để tiếp tục mua hàng.');

  }

  // lấy số lượng trong giỏ hàng
  getQuantityCart() {
    this.cartService.findCartBookByBookId(this.accountId, this.id).subscribe((data: ICartBook) => {
      this.quantityCart = data.cartId.cartQuantity;
    }, () => {
      this.quantityCart = 0;
    }, () => {
    });
  }

  addBookQuantity() {
    this.bookQuantity = this.bookQuantity + 1;
    // lấy số lượng trong giỏ hàng
    this.getQuantityCart();
  }

  subBookQuantity() {
    this.bookQuantity = this.bookQuantity - 1;
    // lấy số lượng trong giỏ hàng
    this.getQuantityCart();
  }

  getQuantity(quantity: any) {
    this.bookQuantity = quantity.value;
    // lấy số lượng trong giỏ hàng
    this.getQuantityCart();

    // số lượng tối đa mua được
    if ((this.quantityCart + this.bookQuantity) > this.bookById.bookQuantity) {
      (document.getElementById('input-quantity') as HTMLFormElement).value = (this.bookById.bookQuantity - this.quantityCart).toString();
      this.notifier.notify('warning', 'Số lượng muốn mua đã vượt quá số lượng sách có trong kho');
    }
  }
}
