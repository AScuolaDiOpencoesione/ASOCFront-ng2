import { Component, OnInit } from '@angular/core';
import { MnAuthService } from '../mn-auth.service';
import { MnProfileService } from '../mn-profile.service';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent implements OnInit {

  constructor(private auth:MnAuthService, private profile:MnProfileService) { }

  ngOnInit() {
  }

}
