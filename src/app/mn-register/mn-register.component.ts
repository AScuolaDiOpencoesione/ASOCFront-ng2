import { Component, OnInit } from '@angular/core';
import { MnProfileService } from '../mn-profile.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'mn-registration',
  templateUrl: './mn-register.component.html',
  styleUrls: ['./mn-register.component.css']
})
export class MnRegisterComponent {

  register = {};

  constructor(private profile:MnProfileService, private router: Router) { }

  doRegister(){
    this.profile.register(this.register).then(x=>{
      alert("Grazie! Abbiamo inviato al tuo indirizzo e-mail il link per completare la registrazione alla piattaforma ASOC.\n\nIl team ASOC");
      this.router.navigate(["/"]);
    });
  }

}
