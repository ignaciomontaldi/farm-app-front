import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loaderSubject : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loader$ = this.loaderSubject.asObservable();
  constructor() { }

  showLoader() {
    this.loaderSubject.next(true);
  }

  hideLoader() {
    setTimeout(() => {
      this.loaderSubject.next(false);
    }, 3000)
  }
}
