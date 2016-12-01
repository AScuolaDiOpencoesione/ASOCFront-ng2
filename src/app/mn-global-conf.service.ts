import { Injectable } from '@angular/core';

@Injectable()
export class MnGlobalConfService {

  http;
  filename;

  conf = {};

  constructor(filename:stirng, http:Http) { 
      this.http = http;
      this.filename = filename;
  }
  
  ngOnInit(){
      this.http.get(this.filename).then(x=>{
          this.conf = x;
      });
  }

}
