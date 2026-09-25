import { Component, inject, OnInit } from '@angular/core';
import { Client } from '../../../core/models/client/client';
import { ClientService } from '../../../core/services/client.service';

@Component({
  selector: 'app-client-list',
  imports: [],
  templateUrl: './client-list.html',
  styleUrl: './client-list.css',
})
export class ClientList implements OnInit {

  private readonly clientService = inject(ClientService);

  clients: Client[] = [];

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {

    this.clientService.getClients().subscribe({

      next: clients => {
        this.clients = clients;
      },

      error: error => {
        console.error('Error loading clients:', error);
      }

    });
  }}
