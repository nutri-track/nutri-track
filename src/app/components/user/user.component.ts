import { Component, Input } from '@angular/core';
import { User, DataUser, DataUserNutricional } from '../../interfaces/userInterface/user.interface';
import { RegisterComponent } from '../register/register.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RegisterComponent, CommonModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  user: User | null = null; // Al inicio no hay usuario
  
  // Recibir el `User` completo
  handleUser(user: User) {
    this.user = user;
    console.log(this.user);
  }
}
