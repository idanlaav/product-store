import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service'; 
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    const { username, password } = this.loginForm.value;
  
    this.authService.login(username, password).subscribe(
      (response: any) => {
        const token = response.token;
        const role = response.role; 
  
        localStorage.setItem('token', token);
        localStorage.setItem('role', role); 
  
        this.authService.setLoginStatus(true, role);
        this.router.navigate(['/home']);
      },
      (error) => {
        this.errorMessage = 'ההתחברות נכשלה. אנא נסה שוב.';
      }
    );
  }
  
  
}
