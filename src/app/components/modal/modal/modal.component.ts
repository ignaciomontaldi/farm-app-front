import { Component, inject, Input } from '@angular/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import { faCheck, faXmark, faExclamation } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../../services/modal/modal.service';

@Component({
  selector: 'app-modal',
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

  private _modalService : ModalService = inject(ModalService);

  isOpen$ = this._modalService.modal$;
  message$ = this._modalService.message$;
  type$ = this._modalService.type$;

  faCheck = faCheck;
  faCross = faXmark;
  faExclamation = faExclamation;

  closeModal() {
    this._modalService.hideModal();
  }

}
