import { Component, OnInit, OnDestroy } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Component({
  selector: 'app-live-users',
  templateUrl: './live-users.component.html',
  styleUrls: ['./live-users.component.css']
})
export class LiveUsersComponent implements OnInit, OnDestroy {
  private connection: HubConnection;
  public users: string[] = [];
  public errorMessage: string = '';

  constructor() {
    this.connection = new HubConnectionBuilder()
      .withUrl('http://localhost:5034/userhub', {
        accessTokenFactory: () => localStorage.getItem('token') || ''
      })
      .build();
  }

  ngOnInit(): void {
    this.startConnection();
    this.setupListeners();
  }

  private startConnection(): void {
    this.connection.start()
      .then(() => console.log("Connected to the hub"))
      .catch(err => {
        this.errorMessage = 'לא הצלחתי להתחבר ל-SignalR';
        console.error('Error connecting to SignalR:', err);
      });
  }

  private setupListeners(): void {
    this.connection.on('UsersUpdated', (users: string[]) => {
      this.users = users;
    });
  }

  ngOnDestroy(): void {
    this.connection.stop();
  }
}
