import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StoreComponent } from './store/store.component';

@Injectable()
export class StoreFirstGuard implements CanActivate {
  private firstNavigation = true;

  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.firstNavigation) {
      this.firstNavigation = false;
      if (next.component !== StoreComponent) {
        this.router.navigateByUrl("/");
        return false;
      }
    }

    return true;
  }
}
