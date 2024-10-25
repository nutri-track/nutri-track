import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { RegisterComponent } from "./components/register/register.component";
import { CommonModule } from '@angular/common';
import { MealsComponent } from "./components/meals/meals.component";
import { FoodsComponent } from "./components/food/food.component";
import { UserComponent } from './components/user/user.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ModalService } from './service/modal-service.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, RegisterComponent, CommonModule, MealsComponent, FoodsComponent,UserComponent,AboutUsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isModalOpen: boolean = false; // Inicializado como false

  constructor(private modalService: ModalService) {
    // Suscribirse al observable del servicio para controlar la apertura del modal
    this.modalService.modalOpen$.subscribe(isOpen => {
      this.isModalOpen = isOpen; // Actualizar el estado del modal
    });
  }

  openRegister() {
    this.modalService.open(); // Abre el modal
  }

  closeRegister() {
    this.modalService.close(); // Cierra el modal
  }
}
