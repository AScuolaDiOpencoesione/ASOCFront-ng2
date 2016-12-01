import { Component, OnInit } from '@angular/core';
import { MnAuthService } from '../mn-auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'mn-login',
  templateUrl: './mn-login.component.html',
  styleUrls: ['./mn-login.component.css'],
})
export class MnLoginComponent {

  login = {};
  
  error = false;
  error_msg = "";

  constructor(private auth:MnAuthService, private router: Router) { }

  doLogin(){
    this.auth.login(this.login).then(x=>{
      console.log(x);
      if (x.type)
        this.router.navigate(["/"]);
      else if (x.user.indexOf("ASOC") == 0)
        if (x.team)
          this.router.navigate(["/"]);
        else
          this.router.navigate(["profile", "create", "team"]);
      else 
        if (x.type)
          this.router.navigate(["/"]);
        else
          this.router.navigate(["profile", "create"]);
    }).catch(x=>{
      this.error = true;
      this.error_msg = x.non_field_errors[0];
    });
  }

}
