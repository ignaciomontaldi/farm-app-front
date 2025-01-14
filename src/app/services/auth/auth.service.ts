import { inject, Injectable } from '@angular/core';
import { API_URL } from '../../constants/apiUrl';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../localStorage/local-storage.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private http = inject(HttpClient)
  private userIsLogged: any = 'false';
  private userEndpoint: string = 'users';

  constructor(private _localStorageService: LocalStorageService, private _http: HttpClient) {
    
  }

  isLoggedIn() {
    return this._localStorageService.getItem('userLogged') === 'true' ? true : false;
  }
  
  register(formValue: any) {

  }
}
