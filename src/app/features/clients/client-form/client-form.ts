import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../../core/services/client.service';

@Component({
  selector: 'app-client-form',
  imports: [ReactiveFormsModule],
  templateUrl: './client-form.html',
  styleUrl: './client-form.css',
})
export class ClientForm {
   private readonly fb = inject(FormBuilder);
  private readonly clientService = inject(ClientService);
  private readonly router = inject(Router);

  clientForm = this.fb.nonNullable.group({

    documentNumber: ['', Validators.required],

    firstName: ['', Validators.required],

    lastName: ['', Validators.required],

    email: ['', [
      Validators.required,
      Validators.email
    ]],

    phone: ['', Validators.required],

    birthDate: ['', Validators.required]

  });

  createClient(): void {

    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      return;
    }

    const request = this.clientForm.getRawValue();

    this.clientService.createClient(request).subscribe({

      next: () => {
        this.router.navigate(['/clients']);
      },

      error: error => {
        console.error('Error creating client:', error);
      }

    });
  }
}
