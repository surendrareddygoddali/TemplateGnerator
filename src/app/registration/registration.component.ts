import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    phone: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    company: new FormControl('')
  });

  errorMsg: string = '';
  success: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log('User submitted:', this.registrationForm.value);
    // TODO: Send user data to server for registration
    if(this.registrationForm.valid){
      const data = {
        "name": this.registrationForm.getRawValue().name,
        "email": this.registrationForm.getRawValue().email,
        "contact": this.registrationForm.getRawValue().phone,
        "password": this.registrationForm.getRawValue().password,
        "company": this.registrationForm.getRawValue().company
      }
      console.log("before api query "+ JSON.stringify(data));
      this.authenticationService.createUser(data).subscribe( resp => {
        if(!resp.registered){
          this.errorMsg = "User already exists please try login!!"
        }else{
          this.success = true;
        }
      });
    }
  }
}
