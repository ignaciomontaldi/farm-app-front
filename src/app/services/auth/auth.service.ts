import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { LoginFormData, RegisterFormData, User } from '../../../types';
import { API_URL } from '../../constants/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private http = inject(HttpClient);
  private _localStorageService : LocalStorageService = inject(LocalStorageService);
  private userLoggedSubject = new BehaviorSubject<boolean>(false);
  userLogged$ = this.userLoggedSubject.asObservable();
  private userEndpoint: string = 'users';

  constructor() {
    this.updateUserData(); // Inicializa el estado de autenticación al crear el servicio
  }

  updateUserData() {
    const isLoggedIn = this.isLoggedIn();
    this.userLoggedSubject.next(isLoggedIn);
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
