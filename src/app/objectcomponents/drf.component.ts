import { ActivatedRoute  }       from '@angular/router';


export interface DRFRouteSetter{
  setRoute(route:ActivatedRoute);
}

export interface DRFServiceSetter{
  setService(service);
}

export abstract class DRFServiceComponent implements  DRFServiceSetter, DRFRouteSetter{
  protected _service;
  protected _route:ActivatedRoute;
  
  setService(service){
    this._service = service;
  }
  
  setRoute(route:ActivatedRoute){
    this._route = route;
  }
  
  abstract prepare()
}