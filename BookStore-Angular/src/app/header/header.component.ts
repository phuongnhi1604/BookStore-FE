import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../service/security/token-storage.service';
import {Router} from '@angular/router';
import {CategoryServiceService} from '../service/book/category-service.service';
import {ICategory} from '../model/book/icategory';
import {CartServiceService} from '../service/cart/cart-service.service';
import {BookServiceService} from '../service/book/book-service.service';
import {ICartBook} from '../model/cart/i-cart-book';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private roles: string[];
  categoryList: ICategory[] = [];
  isLoggedIn = false;
  userName: string;
  search: string;
  showAdminBoard = false;
  showCustomer = false;
  accountId: number;

  totalQuantityCart = 0;
  constructor(private tokenStorageService: TokenStorageService,
              private router: Router,  private categoryService: CategoryServiceService,
              private cartService: CartServiceService, private notifier: NotifierService
              ) {
    this.notifier = notifier;
  }

  ngOnInit(): void {
    this.getAllCategory();
    // kiểm tra đăng nhập
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      this.userName = this.tokenStorageService.getUser().account.username;
      this.roles = this.tokenStorageService.getUser().account.roles[0].roleName;
      // kiểm tra role
      // this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showCustomer = this.roles.includes('ROLE_USER');
    }

    this.accountId = this.tokenStorageService.getUser().account.accountId;
    this.getQuantityCart();
    // this.search = (<HTMLInputElement>document.getElementById("username")).value;
  }
  logout() {
    this.tokenStorageService.signOut();
    this.notifier.notify('success', 'Đăng xuất thành công');
    window.location.assign('http://localhost:4200');
    this.router.navigateByUrl('');
  }

  getAllCategory() {
    return this.categoryService.getAllCategory().subscribe(data => {
      this.categoryList = data;
    });
  }

  searchBook(value: string) {
    this.router.navigateByUrl('/search/' + value);
  }

  getQuantityCart() {
    this.accountId = this.tokenStorageService.getUser().account.accountId;
    this.cartService.findAllCartBook(this.accountId).subscribe((data: ICartBook[]) => {
      this.totalQuantityCart = 0;
      data.forEach((cartBook) => {
        this.totalQuantityCart += cartBook.cartId.cartQuantity;
      });
    }, () => {
    }, () => {
      (document.getElementById('lblCartCount') as HTMLFormElement).innerText = this.totalQuantityCart.toString();
    });
  }
}
