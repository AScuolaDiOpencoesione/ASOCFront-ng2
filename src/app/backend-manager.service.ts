import { Injectable } from '@angular/core';
import { ICRUDService, CRUDResourceServiceBase } from "./crud-ng2";
import { Http, Response, Request, RequestMethod, Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

export function bmsFactory(endpoint: string) {
  return (http: AuthHttp): BackendManagerService => {
    return new BackendManagerService(endpoint,http);
  };
};
@Injectable()
export class BackendManagerService extends CRUDResourceServiceBase implements ICRUDService{
  
  http;
  
  constructor(base_url:string, http:AuthHttp){
    super();
    this.base_url = base_url;
    this.http = http;
    this.headers.append('Accept','application/json');
  }

  datasources:any = {};
  
  active_space:string = "";
  active_source:string = "";
  
  has_paging = false;
  
  headers = new Headers();

  base_url = "http://api.cityopensource.com/api/v2/";

  setActiveSpace(space:string):BackendManagerService{
    this.active_space = space;
    return this;
  }
  
  setPaging(paging:boolean){
    this.has_paging = paging;
    return this;
  }
  
  setActiveApp(app:string):BackendManagerService{
    this.active_source = app;
    return this;
  }
  
  post(url, data){
      return new Promise((resolve, reject)=>{
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Accept','application/json');
      let r_url = this.base_url+url;
      this.http.post(r_url, JSON.stringify(data), {headers:headers})
          .toPromise()
          .then(res=>{
              resolve(res.json());
          });
    });
  }

  getOptions(){
    console.log("getting options");
    return new Promise((resolve, reject)=>{
      let r_url = this.base_url+this.active_source+"/";
      console.log(r_url);
      this.http.request(new Request({
        method: RequestMethod.Options,
        url: r_url,
        headers: this.headers
        }))
          .toPromise()
          .then(res=>{
              resolve(res.json());
          });
    });
  }
  getAll(params:any = {}):Promise<any>{
    return new Promise((resolve, reject)=>{
      let r_url = this.base_url+this.active_source+"/";
      if (params)
        r_url+="?"+this.encodeData(params);
      this.http.get(r_url, {headers:this.headers})
          .toPromise()
          .then(res=>{
              if(this.has_paging){
                resolve(res.json()["results"]);
              }else{
                  resolve(res.json());
              }
          });
    });
  }
  
  addOne(item:any): Promise<any>{
    if (item.hasOwnProperty("id"))
      return this.updateOne(item);
    return new Promise((resolve, reject)=>{
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Accept','application/json');
      let r_url = this.base_url+this.active_source+"/";
      this.http.post(r_url, JSON.stringify(item), {headers:headers})
          .toPromise()
          .then(res=>resolve(res.json()))
    });
  }
  
  getOne(id:number):Promise<any>{
    return new Promise((resolve, reject)=>{
      let r_url = this.base_url+this.active_source+"/"+id+"/";
      this.http.get(r_url, this.headers)
          .toPromise()
          .then(res=>resolve(res.json()))
    });
  }
  
  updateOne(item:any){
    return new Promise((resolve, reject)=>{
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Accept','application/json');
      let r_url = this.base_url+this.active_source+"/"+item["id"]+"/";
      this.http.put(r_url, JSON.stringify(item), {headers:headers})
          .toPromise()
          .then(res=>resolve(res.json()))
    });
  }
  
  removeOne(id:number){
    return new Promise((resolve, reject)=>{
      let r_url = this.base_url+this.active_source+"/";
      this.http.post(r_url, {headers:this.headers})
          .toPromise()
          .then(res=>resolve(res.json()))
    });
  }
  
  private encodeData(data) {
    return Object.keys(data).map(function(key) {
        return [key, data[key]].map(encodeURIComponent).join("=");
    }).join("&");
  }   
}
