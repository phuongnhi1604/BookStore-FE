import {Component, OnInit} from '@angular/core';
import {ICartBook} from '../../model/cart/i-cart-book';
import {ICart} from '../../model/cart/i-cart';
import {ICustomer} from '../../model/customer/icustomer';
import {TokenStorageService} from '../../service/security/token-storage.service';
import {NotifierService} from 'angular-notifier';
import {CartServiceService} from '../../service/cart/cart-service.service';
import {CustomerServiceService} from '../../service/customer/customer-service.service';
import {render} from 'creditcardpayments/creditCardPayments';

@Component({
  selector: 'app-book-cart',
  templateUrl: './book-cart.component.html',
  styleUrls: ['./book-cart.component.css']
})
export class BookCartComponent implements OnInit {
  cartBookList: ICartBook[] = [];
  accountId: number;
  checkList: boolean[] = [];
  checkAll = false;
  money = 0.0;
  totalMoney = 0.0;

  moneyBeforePromotion = 0.0;
  totalMoneyBeforePromotion = 0.0;

  cartDelete: ICartBook = {
    cartId: {},
    bookId: {}
  };

  cartErr: ICart;
  private notifier: NotifierService;
  customer: ICustomer = {};
  cartPaymentList: ICart[] = [];

  idManyCartBook: number[] = [];
  quantityBook: number[] = [];

  paymentPayPal: any;

  constructor(
    private tokenStorageService: TokenStorageService,
    notifier: NotifierService,
    private cartService: CartServiceService,
    private customerService: CustomerServiceService
  ) {
    this.notifier = notifier;
    this.paymentPayPal = render(
      {
        id: '#myPaypalButtons',
        currency: 'USD',
        value: this.totalMoney.toString(),
        onApprove: (details) => {
          this.notifier.notify('success', 'Thanh toán thành công');
          this.payment();
        }
      }
    );
  }

  ngOnInit(): void {
    this.accountId = this.tokenStorageService.getUser().account.accountId;
    this.customerService.findCustomerByAccountId(this.accountId).subscribe((data: ICustomer) => {
      this.customer = data;
    }, () => {
    }, () => {
    });

    this.findAllCartBook();

    this.getTotalMoney();
  }

  findAllCartBook() {
    this.cartService.findAllCartBook(this.accountId).subscribe((data: ICartBook[]) => {
        this.cartBookList = data;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < data.length; i++) {
          this.checkList.push(false);
        }
      },
      (error) => {
        if (error.status === 404) {
          this.cartErr = error.error;
        }
      });
    console.log('cart: ', this.cartBookList);
  }

  subBook(cartBook: ICartBook) {
    cartBook.cartId.cartQuantity = cartBook.cartId.cartQuantity - 1;
    this.cartService.updateQuantityCart(cartBook).subscribe(data => {
    }, () => {
    }, () => {
      this.findAllCartBook();
      this.getTotalMoney();
    });
  }

  addBook(cartBook: ICartBook) {
    cartBook.cartId.cartQuantity = cartBook.cartId.cartQuantity + 1;
    this.cartService.updateQuantityCart(cartBook).subscribe(data => {
    }, () => {
    }, () => {
      this.findAllCartBook();
      this.getTotalMoney();
    });
  }

  isAllChecked() {
    if (this.checkAll) {
      this.checkAll = false;
    } else {
      this.checkAll = true;
    }

    if (this.checkAll) {
      this.checkList.forEach((checked, index) => {
        this.checkList[index] = true;
      });
    } else {
      this.checkList.forEach((checked, index) => {
        this.checkList[index] = false;
      });
    }

    this.getTotalMoney();
  }

  isChecked(i: number) {
    if (this.checkList[i]) {
      this.checkList[i] = false;
    } else {
      this.checkList[i] = true;
    }
    this.getTotalMoney();
  }

  getTotalMoney() {
    this.cartService.findAllCartBook(this.accountId).subscribe((data: ICartBook[]) => {
      this.cartBookList = data;
      this.cartBookList.forEach((check, index) => {
        if (this.checkList[index]) {
          this.money += this.cartBookList[index].bookId.bookPrice * this.cartBookList[index].cartId.cartQuantity
            - (this.cartBookList[index].bookId.bookPrice * this.cartBookList[index].cartId.cartQuantity
              * (this.cartBookList[index].bookId.bookPromotionId.promotionPercent / 100));

          this.moneyBeforePromotion += this.cartBookList[index].bookId.bookPrice * this.cartBookList[index].cartId.cartQuantity;
        }
      });
      this.totalMoney = this.money;
      this.money = 0.0;

      this.totalMoneyBeforePromotion = this.moneyBeforePromotion;
      this.moneyBeforePromotion = 0.0;

      console.log(this.totalMoneyBeforePromotion);
      console.log(this.money);
    });
  }

  getQuantity(quantity: any, cartBook: ICartBook) {
    cartBook.cartId.cartQuantity = quantity.value;
    this.cartService.updateQuantityCart(cartBook).subscribe(data => {
    }, () => {
    }, () => {
      this.findAllCartBook();
      this.getTotalMoney();
    });
  }

  showInfoCartDelete(cartBookDelete: ICartBook) {
    this.cartDelete = cartBookDelete;
  }

  deleteCart(cartBookId: number) {
    console.log(cartBookId);
    this.cartService.deleteBookCart(cartBookId).subscribe(
      () => {
      },
      () => {
      },
      () => {
        this.findAllCartBook();
        this.notifier.notify('success', 'Xoá sản phẩm thành công');
        // window.location.assign('http://localhost:4200/cart');
      });
  }

  getCartBookList(id: number) {
    this.cartService.findAllCartBook(id).subscribe(
      (data: ICartBook[]) => {
        this.cartBookList = data;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.cartBookList.length; i++) {
          this.checkList.push(false);
        }
        this.cartBookList.forEach((cartBook, index) => {
            this.moneyBeforePromotion[index] = cartBook.cartId.cartQuantity * cartBook.bookId.bookPrice - (cartBook.cartId.cartQuantity * cartBook.bookId.bookPrice * cartBook.bookId.bookPromotionId.promotionPercent / 100);
            this.quantityBook[index] = cartBook.bookId.bookQuantity;
          }
        );
      });
  }

  deleteManyBookCart() {
    this.cartService.findAllCartBook(this.accountId).subscribe((data: ICartBook[]) => {
      if (data.length > 0) {
        data.forEach((check, index) => {
          if (this.checkList[index]) {
            this.idManyCartBook[index] = check.cartId.cartId;
            this.cartService.deleteManyBookCart(this.idManyCartBook).subscribe(
              () => {
              },
              () => {
              },
              () => {
                this.getCartBookList(this.accountId);
              },
            );
          }
        });
      }
    });
    if (this.checkList) {
      this.notifier.notify('success', 'Xóa các sản phẩm thành công');
      // window.location.assign('http://localhost:4200/cart');
    }
  }

  payment() {
    this.cartBookList.forEach((check, index) => {
      if (this.checkList[index]) {
        this.cartPaymentList.push(this.cartBookList[index].cartId);
        this.cartService.paymentCart(this.cartPaymentList).subscribe(data => {
        }, () => {
        }, () => {
          this.notifier.notify('success', 'Thanh toán thành công');
          window.location.assign('http://localhost:4200/cart');
        });
      } else {
        this.notifier.notify('default', 'Vui lòng chọn sản phẩm để thanh toán.');
      }
    });
  }

  showPayPalButton() {
    this.cartBookList.forEach((check, index) => {
      if (this.checkList[index]) {
        this.cartPaymentList.push(this.cartBookList[index].cartId);
        (document.getElementById('paymentModal') as HTMLFormElement).click();
        (document.getElementById('myPaypalButtons') as HTMLFormElement).innerHTML = '<div></div>';
        this.paymentPayPal = render(
          {
            id: '#myPaypalButtons',
            currency: 'USD',
            value: (this.totalMoney / 25000).toFixed(2).toString(),
            onApprove: (details) => {
              this.notifier.notify('success', 'Thanh toán thành công');
              this.payment();
            }
          }
        );
      } else {
        this.notifier.notify('warning', 'Vui lòng chọn sản phẩm');
      }
    });
    }
}
