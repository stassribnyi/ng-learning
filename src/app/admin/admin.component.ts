import { Component, OnInit } from '@angular/core';
import { AuthService } from '../model/auth.service';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.auth.clear();
    this.router.navigateByUrl('/');
  }

}
