import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../data-access/auth.service';
import { isRequired, hasEmailError } from '../../utils/validators';
import { FormSignIn } from '../../../interfaces/sign-in.interface';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
})
export default class SignInComponent {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  isRequired(field: 'email' | 'password') {
    return isRequired(field, this.form);
  }

  hasEmailError() {
    return hasEmailError(this.form);
  }

  form = this._formBuilder.group<FormSignIn>({
    email: this._formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
    password: this._formBuilder.control('', Validators.required),
  });

  async submit() {
    const { email, password } = this.form.value;

    if (!email || !password) {
      toast.error('Completa todos los campos');
      return;
    }

    try {
      await this._authService.signIn({ email, password });
      toast.success('Hola de nuevo');
      this._router.navigateByUrl('/standings');
    } catch (error: any) {
      const message = this._parseFirebaseError(error);
      toast.error(message);
    }
  }

  private _parseFirebaseError(error: any): string {
    const code = error?.code;

    switch (code) {
      case 'auth/invalid-email':
        return 'El correo no es válido';
      case 'auth/user-disabled':
        return 'Este usuario ha sido deshabilitado';
      case 'auth/invalid-credential':
        return 'Credenciales incorrectas';
      case 'auth/too-many-requests':
        return 'Demasiados intentos fallidos. Intenta más tarde';
      default:
        return 'Ocurrió un error';
    }
  }
}
