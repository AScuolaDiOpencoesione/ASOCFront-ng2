import { Injectable }     from '@angular/core';
import { Router, CanActivate }    from '@angular/router';
import { MnAuthService } from './mn-auth.service';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class MnAuthGuardService implements CanActivate {
  constructor(private auth:MnAuthService, private router: Router) { }
  
  canActivate() {
    if (tokenNotExpired()) {
      return true;
    }

    console.log(this.router.url);
    
    //this.router.navigate(['/login']);
    return false;
  }
}