import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modalSubject : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private typeState = new BehaviorSubject<"success" | "error" | "warning">("success");
  private messageState = new BehaviorSubject<string>("");

  modal$ = this.modalSubject.asObservable();
  type$ = this.typeState.asObservable();
  message$ = this.messageState.asObservable();

  constructor() { }

  openModal(type: "success" | "error" | "warning" , message: string) {
    this.typeState.next(type);
    this.messageState.next(message);// Llama a hideModal después de 2 segundos para que el modal se cierre con la animación
    this.modalSubject.next(true);
  }

  hideModal() {
    setTimeout(() => {
      this.modalSubject.next(false);
    }, 2000);
  }
}
