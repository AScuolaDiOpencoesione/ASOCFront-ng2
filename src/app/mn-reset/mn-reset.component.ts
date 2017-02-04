import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MnProfileService } from '../mn-profile.service';
@Component({
  selector: 'app-mn-reset',
  templateUrl: './mn-reset.component.html',
  styleUrls: ['./mn-reset.component.css']
})
export class MnResetComponent {

  email;

  constructor(private router: Router, private profile:MnProfileService) { }



  recover(){
    this.profile.password_reset(this.email).then(x=>{
      alert("Ti è stata inviata una mail con un link per reimpostare la password!");
      this.router.navigate(["/"]);
    });
  }

}
