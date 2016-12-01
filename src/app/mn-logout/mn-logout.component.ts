import { Component, OnInit } from '@angular/core';
import { MnAuthService } from '../mn-auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-mn-logout',
  templateUrl: './mn-logout.component.html',
  styleUrls: ['./mn-logout.component.css']
})
export class MnLogoutComponent implements OnInit {

  constructor(private auth:MnAuthService, private router: Router) { }

  ngOnInit() {
    this.auth.logout().then(x=>{
      this.router.navigate(['/']);
    });
  }

}
