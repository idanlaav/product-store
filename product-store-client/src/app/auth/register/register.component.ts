import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service'; 
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
      
  }

  ngOnInit(): void {}

  onSubmit() {
    const { username, password } = this.registerForm.value;

    this.authService.register(username, password).subscribe(
      (response: any) => {
        const token = response.token;
        localStorage.setItem('token', token);
        localStorage.setItem('role', "Customer");
        this.router.navigate(['/home']);
      },
      (error) => {
        this.errorMessage = 'הרשמה נכשלה. אנא נסה שוב.';
      }
    );
  }
}
