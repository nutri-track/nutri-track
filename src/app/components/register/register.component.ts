import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // FormBuilder y ReactiveFormsModule para formularios reactivos
import { User, DataUserNutricional } from '../../interfaces/userInterface/user.interface';
import * as NutricionUtils from "../../utils/user.utiles";
import { CommonModule } from '@angular/common';
import { ModalService } from '../../service/modal-service.service';
import { Router } from '@angular/router'; 
import { UserServiceService } from '../../service/user-service.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Se cambia FormsModule por ReactiveFormsModule
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  @Output()
  userEmitter: EventEmitter<User> = new EventEmitter();

  // Formulario reactivo
  registerForm: FormGroup;

  isModalOpen = false; 

  constructor(
    private fb: FormBuilder,  // Inyectamos FormBuilder
    private modalService: ModalService,  
    private userService: UserServiceService, 
    private router: Router // Para redirigir después de registrar el usuario
  ) {
    // Inicializamos el formulario reactivo con sus validaciones
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
      edad: [null, [Validators.required, Validators.min(10)]],
      peso: [null, [Validators.required, Validators.min(40)]],
      altura: [null, [Validators.required, Validators.min(100)]],
      genero: ['', Validators.required],
      perfil: ['', Validators.required],
      nivelActividad: ['', Validators.required],
    });

    // Subscripción al estado del modal
    this.modalService.modalOpen$.subscribe((isOpen) => {
      this.isModalOpen = isOpen;
    });
  }

  closeModal() {
    this.modalService.close();
  }

  onSubmit() {
    if (this.registerForm.valid) {
        const dataUser = this.registerForm.getRawValue();
        
        const newUser: User = {
            dataUser: dataUser,
            dataUserNutricional: {
                tmb: 0,
                tdee: 0,
                caloriasObjetivo: 0,
                macronutrientes: {
                    proteinas: 0,
                    carbohidratos: 0,
                    grasas: 0
                }
            },
            // Agregar aca otras propiedades necesarias para que se ajuste a la interfaz User
        };

        // Verifica si el formulario contiene los datos correctos
        console.log('Datos del formulario:', dataUser);
  
        // Calcula los valores nutricionales usando el objeto newUser
        newUser.dataUserNutricional.tmb = NutricionUtils.calcularTMB(newUser);
        newUser.dataUserNutricional.tdee = NutricionUtils.calcularTDEE(newUser);
        newUser.dataUserNutricional.caloriasObjetivo = NutricionUtils.calcularCaloriasObjetivo(newUser);
        newUser.dataUserNutricional.macronutrientes = NutricionUtils.calcularMacronutrientes(newUser);

        console.log('Nuevo usuario a emitir:', newUser);
        this.userEmitter.emit(newUser);
  
        // Guarda el nuevo usuario en el servicio
        this.userService.addUser(newUser).subscribe({
            next: (response) => {
                console.log('Usuario guardado:', response);
                this.router.navigate(['/user']);
            },
            error: (error) => {
                console.error('Error al guardar el usuario:', error);
            },
            complete: () => {
                console.log('Operación completada');
            }
        });

        this.closeModal();
    } else {
        console.log('Formulario no válido');
    }
}

togglePassword() {
  const passwordInput = document.getElementById('password') as HTMLInputElement;
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
}


  
  
}
