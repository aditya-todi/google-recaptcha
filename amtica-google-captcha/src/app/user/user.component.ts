import { Component, OnInit } from '@angular/core';
import { User } from '../userService/user';
import { Router } from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User
  errorMessage: string = ''

  constructor(private router: Router) { }

  ngOnInit() {
    let localUser = JSON.parse(localStorage.getItem('user'))
    if (localUser) {
      this.user = localUser
    }
  }

  logout(): void {
    localStorage.removeItem('user')
    this.router.navigate(['/home'])
  }
}
