import { inject, Injectable, OnInit } from '@angular/core';
import { API_URL } from '../../constants/apiUrl';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { User } from '../../../types/user.types';
import { LoginFormData, RegisterFormData } from '../../../types/forms.types';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private http = inject(HttpClient)
  private userIsLogged: any = 'false';
  private userEndpoint: string = 'users';

  constructor(private _localStorageService: LocalStorageService) {
    
  }


  isLoggedIn() {
    return this._localStorageService.getItem('userLogged') === 'true' ? true : false;
  }

  registerUser(data:RegisterFormData){
    return this.http.post<any>(API_URL + this.userEndpoint, data);
  }

  login(data:LoginFormData){
    return this.http.get<any>(API_URL + this.userEndpoint).pipe(
      map(users => {
        const user = users.find((user:User) => user.email === data.email && user.password === data.password);
        if(user){
          this._localStorageService.setItem('userLogged', 'true');
          this._localStorageService.setItem('userId', user.id);
          return user;
        } else {
          throw new Error("Credenciales inválidas");
        }
      })
    )
  }
}
