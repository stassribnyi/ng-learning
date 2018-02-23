import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../model/auth.service';

@Component({
  moduleId: module.id,
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  errorMessage: string;
  username: string;
  password: string;

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {
  }

  authenticate(form: NgForm) {
    if (form.valid) {
      this.auth.authenticate(this.username, this.password).subscribe(response => {
        if (response) {
          this.router.navigateByUrl('/admin/main');
        }

        this.errorMessage = 'Authentication Failed';
      });
    } else {
      this.errorMessage = 'Form Data Invalid';
    }
  }

}
