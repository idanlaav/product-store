import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5034/api/auth'; 
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkLoginStatus()); 
  private roleData = new BehaviorSubject<string>(this.getRoleFromStorage());  
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  role$ = this.roleData.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getRoleFromStorage(): string {
    return localStorage.getItem('role') || ''; 
  }

  setRole(role: string): void {
    localStorage.setItem('role', role);
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  setLoginStatus(status: boolean, role: string) {
    this.isLoggedInSubject.next(status);
    this.roleData.next(role);
    this.setRole(role);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token != null;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.isLoggedInSubject.next(false);
    this.roleData.next('');
  }

  private checkLoginStatus(): boolean {
    return !!localStorage.getItem('token'); 
  }

  register(username: string, password: string): Observable<any> {
    const role = 'Customer';
    return this.http.post<any>(`${this.apiUrl}/register`, { username, password, role }).pipe(
        tap(response => {
            const token = response.token;
            localStorage.setItem('token', token);
            this.setRole(role); 
            this.setLoginStatus(true, role);
        })
    );
}

  
}
