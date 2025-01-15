import { inject, Injectable, OnInit } from '@angular/core';
import { API_URL } from '../../constants/apiUrl';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { User } from '../../../types/user.types';
import { RegisterFormData } from '../../../types/forms.types';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private http = inject(HttpClient)
  private userIsLogged: any = 'false';
  private userEndpoint: string = 'users';
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor(private _localStorageService: LocalStorageService) {
    
  }

  loadUsers(): Observable<User[]> {
    return this.http.get<User[]>(API_URL + this.userEndpoint).pipe(
      tap((users) => {
        this.usersSubject.next(users);
      })
    )
  }

  getUsersList(): Observable<User[]> {
    return this.users$;
  }

  isLoggedIn() {
    return this._localStorageService.getItem('userLogged') === 'true' ? true : false;
  }

  registerUser(data:RegisterFormData){
    return this.http.post<any>(API_URL + this.userEndpoint, data);
  }
}
