import { Component } from '@angular/core';
import { MnAuthService } from './mn-auth.service';
import { MnProfileService } from './mn-profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private auth:MnAuthService, private profile:MnProfileService){}
  
  mode = "test";
  //mode = "";
}
