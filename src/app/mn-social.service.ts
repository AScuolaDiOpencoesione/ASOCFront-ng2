import { Injectable } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { Http, Response, Request, RequestMethod, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

export function mnSocialFactory(endpoint: string) {
  return (http: Http): MnSocialService => {
    return new MnSocialService(endpoint,http);
  };
};

@Injectable()
export class MnSocialService {
      
  headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

  endpoint:string;
  http:Http;

  constructor(endpoint:string, http:Http) {
      this.endpoint = endpoint;
      this.http = http;
  }
  
  login(login_data){
    return new Promise((resolve, reject)=>{
      this.http.post(this.endpoint, login_data).toPromise()
        .then(x=>resolve(x.json()))
        .catch(x=>reject(x.json()))
    });
  }

}
