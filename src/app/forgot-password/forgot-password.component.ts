import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotPasswordForm = new FormGroup({
    email: new FormControl('', Validators.email),
    newPassword: new FormControl('', Validators.required),
    repeatPassword: new FormControl('', Validators.required)
  });

  isSubmitted: boolean = false;
  errorMsg: string = '';
  success: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthenticationService) { }

  ngOnInit() {

  }

  onSubmit() {
    this.isSubmitted = true;
    this.success = false;
    this.errorMsg = '';
    console.log("values"+ this.forgotPasswordForm.getRawValue().newPassword +" hello "+ this.forgotPasswordForm.getRawValue().repeatPassword)
    if (this.forgotPasswordForm.invalid) {
      return;
    } else if (this.forgotPasswordForm.getRawValue().newPassword != this.forgotPasswordForm.getRawValue().repeatPassword) {
      this.errorMsg = "Re-entered password doesn't match!!"
      return;
    } else {
      const data = {
        "email": this.forgotPasswordForm.getRawValue().email,
        "password": this.forgotPasswordForm.getRawValue().newPassword
      }
      this.authService.resetPassword(data).subscribe(resp => {
        if(resp.reset) {
          this.success = true;
        } else {
          this.errorMsg = "Email Doesn't exists!!"
        }
      });
    }
  }
}
