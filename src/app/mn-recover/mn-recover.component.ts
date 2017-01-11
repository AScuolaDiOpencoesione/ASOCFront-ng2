import { Component, OnInit } from '@angular/core';
import { MnProfileService } from '../mn-profile.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-mn-recover',
  templateUrl: './mn-recover.component.html',
  styleUrls: ['./mn-recover.component.css']
})
export class MnRecoverComponent implements OnInit {

  recover={
    uid:"",
    token:"",
    password:"",
  }

  constructor(private profile:MnProfileService, private router: Router, private route:ActivatedRoute) { }

  target = "";

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.recover.uid = params["uid"];
      this.recover.token = params["token"];
    });

  }
  
  finalize(){
    this.profile.password_reset_confirm(this.recover).then(x=>{
      this.router.navigate("/");
    });
  }

}
