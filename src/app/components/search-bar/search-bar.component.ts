import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { validateSearch } from '../../../utils/searchValidator';
import { Router } from '@angular/router';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-search-bar',
  imports: [ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  private router : Router = inject(Router);
  private _modalService : ModalService = inject(ModalService);
  searchForm: FormGroup;

  constructor() {
    this.searchForm = new FormGroup({
      searchTerm: new FormControl()
    });
  }

  onSearch() {
    console.log(this.searchForm.value.searchTerm)
    if(validateSearch(this.searchForm.value.searchTerm)){
      this.router.navigate(['/search'], {queryParams: {q: this.searchForm.value.searchTerm}});
    } else {
      this._modalService.openModal("error", "El término de búsqueda es inválido");
      this.searchForm.reset();
      this._modalService.hideModal()
    }
  }

}
