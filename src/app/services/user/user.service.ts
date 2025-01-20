import { inject, Injectable } from '@angular/core';
import { User } from '../../../types/user.types';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../constants/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient)
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();
  private userEndpoint: string = 'users';

  constructor() { }

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

    getUserById(id: string): Observable<User> {
      return this.http.get<User>(API_URL + this.userEndpoint + '/' + id);
    }

}
