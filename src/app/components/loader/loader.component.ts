import { Component, inject } from '@angular/core';
import { LoaderService } from '../../services/loader/loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
  private _loaderService: LoaderService = inject(LoaderService);
  loading = this._loaderService.loader$;
}
