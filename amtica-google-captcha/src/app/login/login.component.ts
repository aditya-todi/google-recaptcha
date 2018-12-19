import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from "@angular/forms";
import { UserService } from '../userService/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  errorMessage: string = ''
  captchaResolution: boolean = false

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: '',
      password: '',
      captcha: false
    }, { validators: checkCaptcha })
  }

  saveForm(): void {
    if (this.loginForm.invalid) {
      return
    }
    let valueObj = this.loginForm.value
    this.userService.login(valueObj.username, valueObj.password)
      .subscribe(
        user => {
          console.log(user)
          localStorage.setItem('user', JSON.stringify(user))
          this.router.navigate(['/user'])
        },
        err => {
          this.errorMessage = err
        }
      )
  }

  resolved(_: string): void {
    this.loginForm.patchValue({
      captcha: true
    })
  }
}

let checkCaptcha = (form: AbstractControl): { [key: string]: boolean } | null => {
  const captcha = form.get('captcha')
  if (!captcha.value) {
    return { 'recaptcha': true }
  }
  return null
}
