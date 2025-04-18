import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import * as signalR from "@microsoft/signalr";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'חנות מוצרים';
  isLoggedIn: boolean = false;
  role: string = '';
  connectedUsers: string[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.checkLoginStatus();
    this.authService.isLoggedIn$.subscribe(status => {
        this.isLoggedIn = status;
    });
    this.authService.role$.subscribe(role => {
        this.role = role;
    });

    const connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5034/userhub", {
        accessTokenFactory: () => localStorage.getItem('token') || ""
      })
      .build();

    connection.on("UsersUpdated", (users: string[]) => {
        this.connectedUsers = users; 
    });

    connection.start()
      .then(() => {
        console.log("Connected to UserHub");
      })
      .catch(err => console.error("Error connecting to SignalR:", err));
  }

  checkLoginStatus() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedIn = true;
      this.role = localStorage.getItem('role') || 'Customer';
    } else {
      this.isLoggedIn = false;
      this.role = '';
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.isLoggedIn = false;
    this.role = '';
    this.router.navigate(['/login']);
  }
}
