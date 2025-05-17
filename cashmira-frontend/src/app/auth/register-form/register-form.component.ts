import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { showSnackbar } from '../../app.component';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent {
  @Output() switchMode = new EventEmitter<void>();
  successMessage: string | null = null;
  loading = false;
  isLogin = false;
  hidePassword = true;

  checks = {
    minLength: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false
  };

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^\+?\d{7,}$/)]],
    password: ['', [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)
    ]],
    pin: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
  });

  onSubmit() {
    if (this.registerForm.invalid) return;

    this.loading = true;
    this.http.post('http://localhost:8080/api/auth/register', this.registerForm.value).subscribe({
      next: () => {
        showSnackbar("Registration successful! Please wait a few minutes for approval...", "success");
        setTimeout(() => {
          this.switchMode.emit();
        }, 3000);
      },
      error: (err) => {
        showSnackbar("Uh-oh... Something went wrong, contact support!", "error");
        this.loading = false;
      }
    });
  }

  updatePasswordChecks() {
    const value = this.registerForm.get('password')?.value || '';
    this.checks.minLength = value.length >= 5;
    this.checks.uppercase = /[A-Z]/.test(value);
    this.checks.lowercase = /[a-z]/.test(value);
    this.checks.number = /\d/.test(value);
    this.checks.specialChar = /[\W_]/.test(value);
  }
}
