import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../../core/models/user/user';
import { UserService } from '../../../core/services/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-list',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList implements OnInit {

  private readonly userService = inject(UserService);

  users: User[] = [];

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {

    this.userService.getUsers().subscribe({

      next: users => {
        this.users = users;
      },

      error: error => {
        console.error('Error loading users:', error);
      }

    });
  }

  deleteUser(id: number): void {

    if (!confirm('¿Está seguro de eliminar este usuario?')) {
      return;
    }

    this.userService.deleteUser(id).subscribe({

      next: () => {
        this.loadUsers();
      },

      error: error => {
        console.error('Error deleting user:', error);
      }

    });
  }
}
