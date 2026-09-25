import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserRole } from '../../../core/models/user/user';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm implements OnInit {

  private readonly fb = inject(FormBuilder);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  userId: number | null = null;

  userForm = this.fb.nonNullable.group({
    username: ['', Validators.required],

    password: ['', Validators.required],

    role: ['ROLE_USER' as UserRole, Validators.required]
  });

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.userId = Number(id);
      this.loadUser(this.userId);
    }
  }

  loadUser(id: number): void {

    this.userService.getUserById(id).subscribe({

      next: user => {

        this.userForm.patchValue({
          username: user.username,
          role: user.role
        });

        // Al editar no necesitamos obligar
        // a introducir una nueva contraseña.
        this.userForm.controls.password.clearValidators();
        this.userForm.controls.password.updateValueAndValidity();
      },

      error: error => {
        console.error('Error loading user:', error);
      }

    });
  }

  saveUser(): void {

    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const request = this.userForm.getRawValue();

    if (this.userId) {

      this.userService.updateUser(
        this.userId,
        request
      ).subscribe({

        next: () => {
          this.router.navigate(['/users']);
        },

        error: error => {
          console.error('Error updating user:', error);
        }

      });

      return;
    }

    this.userService.createUser(request).subscribe({

      next: () => {
        this.router.navigate(['/users']);
      },

      error: error => {
        console.error('Error creating user:', error);
      }

    });
  }
}
