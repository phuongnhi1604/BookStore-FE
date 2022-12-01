import { Component, OnInit } from '@angular/core';
import {ICart} from '../../model/cart/i-cart';
import {CartServiceService} from '../../service/cart/cart-service.service';
import {TokenStorageService} from '../../service/security/token-storage.service';

@Component({
  selector: 'app-list-cart-history',
  templateUrl: './list-cart-history.component.html',
  styleUrls: ['./list-cart-history.component.css']
})
export class ListCartHistoryComponent implements OnInit {
  cartList: ICart[] = [];
  page = 1;
  size: number;
  totalElements: number;

  accountId: number;
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showCustomer = false;
  userName: string;
  constructor(private cartService: CartServiceService,
              private tokenStorageService: TokenStorageService) { }

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
    this.getAllCartPayed(this.accountId, this.page);
  }

  getAllCartPayed(accountId: number, page: number) {
    this.page = page;
    this.cartService.findAllCartPayed(accountId, this.page - 1).subscribe((data: any) => {
        this.cartList = data.content;
        this.size = data.size;
        this.totalElements = data.totalElements;
      },
      () => {
        this.page--;
        this.getAllCartPayed(accountId, this.page);
      },
      () => {
      }
    );
  }
}
