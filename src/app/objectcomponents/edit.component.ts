import { Component, Input } from '@angular/core';
import {DRFServiceSetter, DRFServiceComponent} from './drf.component';
import {DRFNewComponent } from './new.component';
import { ActivatedRoute, Router } from '@angular/router';

import { BackendManagerService } from '../backend-manager.service';

@Component({
  selector:"[edit-item]",
  templateUrl:"./form.component.html",
})
export class DRFEditComponent extends DRFNewComponent{
  @Input() id;
  @Input() service;

  config:any;

  
  constructor(private ebms:BackendManagerService, private eroute: ActivatedRoute, private erouter:Router){
    super(ebms, eroute, erouter);
  }
  
  get(id:number){
    this._service.getOne(id).then(item =>{ 
      this.formdata = item;
    });
  }

  prepare(){
    this.getFields();
    this.get(this.id);
  }
  
  ngOnInit(){
    this.config = this.eroute.snapshot.data;
    this.id = this.eroute.snapshot.params.id;
    console.log("editing",this.config.datasource, this.id);
    //HARDFIX for ASOC1617
    if(this.config.datasource == "teamdetails" && this.id == 6){
      this.id = 8;
      console.log("Nope. editing",this.config.datasource, this.id);
    }
      
    this.setService(this.ebms.setActiveSpace("").setActiveApp(this.config.datasource));
    this.prepare();
  }
  
  pre_save(item:any){
    item.id = this.id;
  }
}