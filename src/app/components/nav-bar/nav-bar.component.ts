import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModalService } from '../../service/modal-service.service';
import { Output,EventEmitter } from '@angular/core';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  @Output() registerClicked = new EventEmitter<void>(); // Emisor de eventos

  constructor(private modalService: ModalService) {}

  openModal() {
    this.modalService.open(); // Abre la modal
    this.registerClicked.emit(); // Emitir evento para abrir el modal

  }
}
