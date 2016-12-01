import { Injectable } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { Http, Response, Request, RequestMethod, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Subject }    from 'rxjs/Subject';

export function mnAuthFactory(endpoint: string) {
  return (http: Http): MnAuthService => {
    return new MnAuthService(endpoint,http);
  };
};

@Injectable()
export class MnAuthService {

  endpoint:string;
  http:Http;
  
  loggedin = false;

  private userAuthenticatedSource = new Subject<boolean>();
  
  userAuthenticated$ = this.userAuthenticatedSource.asObservable();
  
  constructor(endpoint:string, http:Http) {
      this.endpoint = endpoint;
      this.http = http;
  }
  
  headers = new Headers({ 'Content-Type': 'application/json', "Accept":'application/json' }); //ffox is a jerk...
  ngOnInit(){
    this.autologin();
  }
  
  autologin(){
    let x = localStorage.getItem("id_token");
    if(x){
      this.loggedin = true;
      this.userAuthenticatedSource.next(true);
    }
    else {
      this.loggedin = false;
      //this.userAuthenticatedSource.next(false);
    }
  }
  
  login(login_data){
    return new Promise((resolve, reject)=>{
      this.http.post(this.endpoint+"?format=json", login_data, {headers:this.headers}).toPromise()
        .then(x=>{
          console.log(x);
          let a = x.json();
          localStorage.setItem("id_token",a.token);
          localStorage.setItem("userData",JSON.stringify(a));
          this.userAuthenticatedSource.next(true);
          this.loggedin = true;
          resolve(a);
        })
        .catch(x=>reject(x.json()))
    });
  }
  
  logout(){
    return new Promise((resolve, reject)=>{
      localStorage.removeItem("id_token");  
      localStorage.removeItem("userData");  
      this.userAuthenticatedSource.next(false);
      this.loggedin = false;
      resolve();
    });
  }
  
  userLoggedIn(){
    return this.loggedin;
  }
  
}
