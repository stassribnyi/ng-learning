import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'auth',
  moduleId: module.id,
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  errorMessage: string;
  username: string;
  password: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  authenticate(form: NgForm) {
    if (form.valid) {
      // process authentication
      this.router.navigateByUrl('/admin/main');
    } else {
      this.errorMessage = 'Form Data Invalid';
    }
  }

}
