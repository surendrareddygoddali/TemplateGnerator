import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  isAuthSuccess: boolean = false;
  name: string = '';
  errorMsg: string = '';

  constructor(private router: Router,
    private authenticateService: AuthenticationService) {
    this.authenticateService.userName$.subscribe(value => {
      this.name = value;
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Logging in...');
      // Send login request to server

      const data = {
        "email": this.loginForm.getRawValue().username,
        "password": this.loginForm.getRawValue().password
      };

      console.log("before api query " + JSON.stringify(data));

      this.authenticateService.authenticateUser(data).subscribe(resp => {
        console.log("response data" + JSON.stringify(resp));
        this.isAuthSuccess = resp.authorized;
        console.log("isAuthSucces " + this.isAuthSuccess);
        if (this.isAuthSuccess === true) {
          this.authenticateService.updateUserName(resp.name);
          this.router.navigate(['', 'template-generater']);
        } else {
          this.errorMsg = 'Invalid Credentials';
        }
      });
    }
  }
}
