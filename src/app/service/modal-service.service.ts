import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalOpenSource = new Subject<boolean>();
  modalOpen$ = this.modalOpenSource.asObservable();

  open() {
    this.modalOpenSource.next(true);
  }

  close() {
    this.modalOpenSource.next(false);
  }
}
