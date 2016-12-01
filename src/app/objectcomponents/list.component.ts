import { Component, Input, Inject, Output, EventEmitter, ViewContainerRef, ViewChild, ComponentResolver, ComponentMetadata, ComponentFactory, Directive, ReflectiveInjector, Pipe, PipeTransform  } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogModule } from 'primeng/primeng';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { DRFServiceComponent } from './drf.component';
import { BackendManagerService } from '../backend-manager.service';

import { ListService } from '../list.service';

export function createComponentFactory(resolver: ComponentResolver, metadata: ComponentMetadata): Promise<ComponentFactory<any>> {
    const cmpClass = class DynamicComponent extends DRFServiceComponent { 
      public item:any; 
      public mgmt_svc:string;
      public show_edit;
      public showDetail = false;
      public list:ListService;
      
      selecteditem = new EventEmitter();
      
      prepare(){} 
      toggleDetail(){
        this.showDetail = !this.showDetail; 
      } 
      modal_edit(id){
        this.show_edit=id;
      }
      rowclicked(){
        console.log(this.item);
        this.selecteditem.emit(this.item);
        this.list.setItem(this.item);
      }
      go_edit(id){
        window.location.hash="#/"+this.mgmt_svc
      }
    };
    const decoratedCmp = Component(metadata)(cmpClass);
    return resolver.resolveComponent(decoratedCmp);
}

@Pipe({name: 'capitalize'})
export class CapitalizePipe implements PipeTransform {

    transform(value:any) {
        if (value) {
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
        return value;
    }

}

@Directive({
  selector:"[list-item]",
})
export class DRFListItemComponent extends DRFServiceComponent{
  @Input() public item:any|Promise<any>;
  @Input() public template:string;
  @Input() public management_service:string;
  constructor(private vcRef: ViewContainerRef, private resolver: ComponentResolver, private list:ListService) {
    super();
    console.log(this.item);
  }
  
  @Output() selectedrow = new EventEmitter();
  
  selectitem(item){
    this.selectedrow.emit(item);
  }
  
  ngOnChanges() {
    const metadata = new ComponentMetadata({
        selector: 'tbody[spec-list-item]',
        template: this.template,
        pipes:[CapitalizePipe],
        outputs:["selecteditem"],
    });
    createComponentFactory(this.resolver, metadata).then(factory => {
        const injector = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);
        let i = this.vcRef.createComponent(factory, 0, injector, []).instance;
        i.list = this.list;
        i.item = this.item;
        i.mgmt_svc = this.management_service;
      });  
  }
  prepare(){};
}


@Directive({
  selector:"[head-list]",
})
export class DRFListHeadComponent extends DRFServiceComponent{
  @Input() public template:string;
  constructor(private vcRef: ViewContainerRef, private resolver: ComponentResolver) {
    super();
  }
  
  ngOnChanges() {
    if(this.template){
      const metadata = new ComponentMetadata({
          selector: 'thead[spec-list-head]',
          template: this.template,
          pipes:[CapitalizePipe],
      });
      createComponentFactory(this.resolver, metadata).then(factory => {
          const injector = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);
          let i = this.vcRef.createComponent(factory, 0, injector, []).instance;
        });  
    }
  }
  prepare(){};
}

@Directive({
  selector:"[filter-list]",
})
export class DRFListFilterComponent extends DRFServiceComponent{
  @Input() public template:string;
  constructor(private vcRef: ViewContainerRef, private resolver: ComponentResolver) {
    super();
  }
  
  ngOnChanges() {
    console.log(this.template);
    const metadata = new ComponentMetadata({
        selector: '[spec-list-filter]',
        template: this.template,
        pipes:[CapitalizePipe],
    });
    createComponentFactory(this.resolver, metadata).then(factory => {
        const injector = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);
        let i = this.vcRef.createComponent(factory, 0, injector, []).instance;
      });  
  }
  prepare(){};
}


@Component({
  selector:"[list]",
  templateUrl:"./list.component.html",
  directives:[DRFListItemComponent, DRFListFilterComponent, DRFListHeadComponent],
})
export class DRFListComponent extends DRFServiceComponent{
  public items:any[];
  public internal_items:any[];
  search:string;

  config:any;
  cols:any[];

  constructor(private bms:BackendManagerService, private route: ActivatedRoute, private http:Http){
    super();
    this.config = this.route.snapshot.data;
    //this.setConf(this.config);
    this.cols = this.config["cols"];
    this.setService(bms.setActiveSpace(this.config.dataspace).setActiveApp(this.config.datasource));

  }

   onChange(){
    this.items = [];
    for(let i of this.internal_items){
      let data = JSON.stringify(i).toLowerCase();
      let src = this.search.toLowerCase();
      if(data.indexOf(src) >= 0)
        this.items.push(i);
    }
   }

  ngOnInit(){
    //console.log(this.config);
    this.prepare();

  }

  template = "";

  template_url = "/assets/list-item.component.html";

head_template = "";
filter_template = "";

  page = 1;
  
  goto(pp:number){
    this.page += pp;
    this.page = Math.max(this.page,1);
    this.show_els();
  }

  show_els(){
     this._service.getAll({page:this.page}).then(x=>{
        console.log(x);
        this.internal_items=x;
        this.items = this.internal_items;
      });
  }
  
  selectitem(itm){
    console.log(itm);  
  }
  

  prepare(){
    if (this.config.list_template) 
      this.template_url = this.config.list_template;
    console.log(this.template_url);
    
    this.http.get(this.template_url).toPromise().then(x=>{
      this.template = x.text();
      this.show_els();
    });
    this.http.get(this.config.list_head).toPromise().then(x=>{
      this.head_template = x.text();
    });
    this.http.get(this.config.list_filters).toPromise().then(x=>{
      this.filter_template = x.text();
    });
    
  }
}


@Component({
  selector:"[list-mini]",
  templateUrl:"./list-mini.component.html",
  directives:[DRFListItemComponent, DRFListFilterComponent, DRFListHeadComponent],
})
export class DRFMiniListComponent extends DRFServiceComponent{
  public items:any[];
  public internal_items:any[];
  @Input() config;
  search:string;
  
  @Output() selectedrow = new EventEmitter();

  cols:any[];

  constructor(private bms:BackendManagerService, private route: ActivatedRoute, private http:Http){
    super();
  }

   onChange(){
    this.items = [];
    for(let i of this.internal_items){
      let data = JSON.stringify(i).toLowerCase();
      let src = this.search.toLowerCase();
      if(data.indexOf(src) >= 0)
        this.items.push(i);
    }
   }

  selectitem(item:any){
    console.log(item);
    this.selectedrow.emit(item);
  }

  ngOnInit(){
    this.setService(this.bms.setActiveSpace(this.config.dataspace).setActiveApp(this.config.datasource));
    this.prepare();

  }

  template = "";

  template_url = "/assets/list-item.component.html";

  head_template = "";
  filter_template = "";

  page = 1;
  
  goto(pp:number){
    this.page += pp;
    this.page = Math.max(this.page,1);
    this.show_els();
  }

  show_els(){
     this._service.getAll({page:this.page}).then(x=>{
        console.log(x);
        this.internal_items=x;
        this.items = this.internal_items;
      });
  }

  prepare(){
    if (this.config.list_template) 
      this.template_url = this.config.list_template;
    console.log(this.template_url);
    
    this.http.get(this.template_url).toPromise().then(x=>{
      this.template = x.text();
      this.show_els();
    });
    this.http.get(this.config.list_head).toPromise().then(x=>{
      this.head_template = x.text();
    });
    this.http.get(this.config.list_filters).toPromise().then(x=>{
      this.filter_template = x.text();
    });
    
  }
}

