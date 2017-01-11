import { Injectable } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { Http, Response, Request, RequestMethod, Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { MnAuthService } from './mn-auth.service';
import 'rxjs/add/operator/toPromise';

export function mnProfileFactory(endpoint: string) {
  return (ahttp: AuthHttp, http:Http, auth:MnAuthService): MnProfileService => {
    return new MnProfileService(endpoint,ahttp,http,auth);
  };
};

@Injectable()
export class MnProfileService {
    endpoint:string;
    ahttp:AuthHttp;
    http:Http;
    auth:MnAuthService;
    
    userData = {};
    
    constructor(endpoint:string, ahttp:AuthHttp, http:Http, auth:MnAuthService) {
        this.ahttp = ahttp;
        this.http = http;
        this.endpoint = endpoint;
        this.auth = auth;
        
        this.auth.userAuthenticated$.subscribe(s=>{
           if(s){
               this.userData = JSON.parse(localStorage.getItem("userData"));
               console.log(this.userData);
           } else {
               this.userData = null;
           }
        });
    }
  
    refreshUserData(){
        return new Promise((resolve, reject)=>{
            if(this.auth.userLoggedIn()){
                this.http.get(this.endpoint+"me/").toPromise().then(x=>{
                    this.userData = x.json();
                    console.log(this.userData);
                    resolve(this.userData);
                });
            } else {
                this.userData = {};
                resolve(this.userData);
            }
        });
    }
    
    get data(){
        return new Promise((resolve,reject)=>{
            if(!this.userData)
                this.refreshUserData().then(x=>{resolve(this.userData);});
            else
                resolve(this.userData);    
        });
        
    }
    
    hasRole(role:string){
        return this.data.__zone_symbol__value.hasOwnProperty(role);
    }
    
    usernameStartsWith(sw:string){
        return new Promise((resolve, reject)=>{
            if (this.data.username.indexOf(sw) >= 0)
                resolve(true);
            else 
                resolve(false);
        });
    }
    
    register(user){
        return new Promise((resolve,reject)=>{
            let h = new Headers({ 'Content-Type': 'application/json', 'Accept':'application/json' });
            this.http.post(this.endpoint+"register/"+"?format=json", user, {headers:h}).toPromise().then(x=>{
                resolve(x);
            });
        });
    }
    
    change_username(data){
        return new Promise((resolve,reject)=>{
            let h = new Headers({ 'Content-Type': 'application/json', 'Accept':'application/json' });
            this.ahttp.post(this.endpoint+"username/"+"?format=json", data, {headers:h}).toPromise().then(x=>{
                resolve();
            });
        });
    }
    
    activate(uid:string, token:string){
      return new Promise((resolve,reject)=>{
        let h = new Headers({ 'Content-Type': 'application/json' });
        this.http.post(this.endpoint+"activate/", JSON.stringify({"uid":uid, "token":token}), {headers:h})
            .toPromise()
            .then(content => {
                console.log("ACTIVATED",content);
                resolve(content);
            }).catch(y=>{
                console.log(y);
            });
        });
    }
    
    password_reset(data){
        return new Promise((resolve,reject)=>{
        let h = new Headers({ 'Content-Type': 'application/json' });
            this.http.post(this.endpoint+"password/reset/"+"?format=json", JSON.stringify({"email":data}), {headers:h}).toPromise().then(x=>{
                resolve();
            });
        });
    }
    
    password_reset_confirm(data){
        return new Promise((resolve,reject)=>{
        let h = new Headers({ 'Content-Type': 'application/json' });
            this.http.post(this.endpoint+"password/reset/confirm/"+"?format=json", JSON.stringify(data),  {headers:h}).toPromise().then(x=>{
                resolve();
            });
        });
    }
    
    change_password(data){
        return new Promise((resolve,reject)=>{
        let h = new Headers({ 'Content-Type': 'application/json' });
            this.http.post(this.endpoint+"password/"+"?format=json", JSON.stringify(data), {headers:h}).toPromise().then(x=>{
                resolve();
            });
        });
    }

}
