import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ICustomer} from '../../model/customer/icustomer';

const URL_API = 'http://localhost:8080/api/customer';
@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  constructor( private http: HttpClient) { }

  findCustomerByAccountId(accountId: number): Observable<ICustomer> {
    return this.http.get<ICustomer>(URL_API + '/getCustomerByAccount?accountId=' + accountId);
  }
}
