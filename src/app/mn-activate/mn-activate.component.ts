import { Component, OnInit } from '@angular/core';
import { MnProfileService } from '../mn-profile.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-mn-activate',
  templateUrl: './mn-activate.component.html',
  styleUrls: ['./mn-activate.component.css']
})
export class MnActivateComponent implements OnInit {

  uid;
  token;

  constructor(private profile:MnProfileService, private router: Router, private route:ActivatedRoute) { }

  target = "";

  ngOnInit() {
    
    this.route.params.subscribe(params => {
            this.uid = params["uid"];
            this.token = params["token"];
            
            console.log(this.uid);
            console.log(this.token);
          
            
            this.profile.activate(this.uid, this.token).then(x=>{
              this.router.navigate("/");
            });
        });

  }

}
