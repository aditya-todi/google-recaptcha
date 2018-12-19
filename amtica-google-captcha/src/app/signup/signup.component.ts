import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from "@angular/forms";
import { UserService } from '../userService/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup
  errorMessage: string = ''
  captchaResolution: boolean = false

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router) {
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      passwordGroup: this.fb.group({
        password: ['', [Validators.required]],
        confirmedPassword: ['', [Validators.required]],
      }, { validators: matchPassword }),
      author: false,
      captcha: false
    }, { validators: checkCaptcha })
  }

  saveForm(): void {
    if (this.registerForm.invalid) {
      return
    }
    console.log(this.registerForm.value)
    let valueObj = this.registerForm.value
    this.userService.signUp(
      valueObj.name, valueObj.username, valueObj.passwordGroup.password, valueObj.author, false)
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

  populateTestData(): void {
    this.registerForm.patchValue({
      name: 'test_name',
      username: Math.random().toString(),
      passwordGroup: {
        password: 'password',
        confirmedPassword: 'password',
      },
      author: true
    })
  }

  resolved(_: string): void {
    this.registerForm.patchValue({
      captcha: true
    })
  }
}

let matchPassword = (form: AbstractControl): { [key: string]: boolean } | null => {
  const passwordControl = form.get('password')
  const confirmedPasswordControl = form.get('confirmedPassword')

  if (passwordControl.pristine || confirmedPasswordControl.pristine) {
    return null
  }

  if (passwordControl.value === confirmedPasswordControl.value) {
    return null
  }

  return { match: true }
}

let checkCaptcha = (form: AbstractControl): { [key: string]: boolean } | null => {
  const captcha = form.get('captcha')
  if (!captcha.value) {
    return { 'recaptcha': true }
  }
  return null
}
