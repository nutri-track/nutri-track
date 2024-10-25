import { Injectable } from '@angular/core';
import { User } from '../interfaces/userInterface/user.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private apiUrl = 'http://localhost:3000/users'; // URL del json-server

  constructor(private http: HttpClient) {}

  // Método para agregar un usuario
  addUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);  // Hace la petición POST al servidor
  }
  
}
