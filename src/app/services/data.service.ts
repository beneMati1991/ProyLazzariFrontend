import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CredentialsService } from './credentials.service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  logged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  user: BehaviorSubject<any> = new BehaviorSubject<any>({});
  expireDate: any;

  constructor(public credentialsService: CredentialsService) {
    if (this.credentialsService.getSession('token') !== null) {
      this.logged = new BehaviorSubject<boolean>(true);
      this.user = new BehaviorSubject<any>(
        this.getDecodedAccessToken(this.credentialsService.getSession('token'))
      );
    }
  }

  getDecodedAccessToken(token: any): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}
