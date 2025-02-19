import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { LoaderComponent } from "./components/loader/loader.component";
import { ModalComponent } from "./components/modal/modal/modal.component";

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet, LoaderComponent, ModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'farmapp';

}
