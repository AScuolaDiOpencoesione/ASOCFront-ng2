import { Injectable } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { Http, Response, Request, RequestMethod, Headers } from '@angular/http';
import { URLSearchParams } from "@angular/http";
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

export function mnUploadFactory(endpoint: string) {
  return (http: AuthHttp): MnUploadService => {
    return new MnUploadService(endpoint,http);
  };
};

/*
Endpoint:  http://163.172.69.22:9000  http://127.0.0.1:9000  http://172.17.0.1:9000
AccessKey: WUP8ARV7VOLNM5P1FM5S
SecretKey: /RxgLqYH9FXqrmI1A+mjaqSI6eNrLPtmeyDAeERL
Region:    us-east-1
SQS ARNs:  <none>

*/

/*
{"x-amz-algorithm": "AWS4-HMAC-SHA256", 
"x-amz-signature": "3be7b6bf0d20b090b9c15e7300755d5f37b3f596bd93924fe5af5cf4c9c72ae1", 
"form_action": "http://files.ascuoladiopencoesione.it/asoc1617", 
"key": "uploads/misc/825dc082-04b7-4695-aebd-8545acc3627a.csv", 
"x-amz-date": "20161129T002554Z", 
"policy": "eyJjb25kaXRpb25zIjogW3siYnVja2V0IjogImFzb2MxNjE3In0sIHsiYWNsIjogInB1YmxpYy1yZWFkIn0sIFsic3RhcnRzLXdpdGgiLCAiJGtleSIsICIiXSwgeyJzdWNjZXNzX2FjdGlvbl9zdGF0dXMiOiAiMjAxIn0sIHsieC1hbXotY3JlZGVudGlhbCI6ICJXVVA4QVJWN1ZPTE5NNVAxRk01Uy8yMDE2MTEyOS91cy1lYXN0LTEvczMvYXdzNF9yZXF1ZXN0In0sIHsieC1hbXotYWxnb3JpdGhtIjogIkFXUzQtSE1BQy1TSEEyNTYifSwgeyJ4LWFtei1kYXRlIjogIjIwMTYxMTI5VDAwMjU1NFoifSwgeyJjb250ZW50LXR5cGUiOiAiYXBwbGljYXRpb24vdm5kLm1zLWV4Y2VsIn1dLCAiZXhwaXJhdGlvbiI6ICIyMDE2LTExLTI5VDAwOjMwOjU0LjAwMFoifQ==", 
"success_action_status": 201, 
"x-amz-credential": "WUP8ARV7VOLNM5P1FM5S/20161129/us-east-1/s3/aws4_request", 
"content-type": "application/vnd.ms-excel", 
"acl": "public-read"}
*/

@Injectable()
export class MnUploadService { 
    endpoint;
    http;
  constructor(endpoint, http) { 
      this.endpoint = endpoint;
      this.http = http;
  }
  
  conf = {};
  
  ngOnInit(){
  }
  
  getPresignedUrl(f:File){
    return new Promise((resolve, reject)=>{
      let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded', 'Accept':'application/json' });
      console.log("getting presigned URL");
      console.log(f);
      this.http.get(this.endpoint+"?name="+f.name, {}, { headers: headers }).toPromise().then(x=>{
        this.conf = x.json();
        console.log(this.conf);
        resolve(this.conf);
      }).catch(y => {
        console.log(y);
        reject(y);
      });
    });
  }
  
  uploadFiles(files:FileList){
    return new Promise((resolve, reject)=>{
      let f = files.item(0);
      console.log(f);
      //var reader = new FileReader();
      //reader.onloadend = (e => {
      //  console.log(e);
      //  let content = e.target.result.split(",")[1];
      //    
      //  this.http.get(this.endpoint, {name:f.name}).toPromise().then(x=>{
      //    console.log(x);
      //  });
      //  // e.target.result should contain the text
      //});
      //reader.readAsDataURL(f);
      console.log("starting file upload");
      this.getPresignedUrl(f).then(x=>{
        console.log(x);
        let fa = x["url"];
        this.http.put(fa, f).toPromise().then(xx=>{
          console.log(xx);
          resolve(xx.url.split("?")[0]);
        });
        
      });
      
    });
  }

}
