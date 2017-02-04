import { Component, OnInit } from '@angular/core';
import { Http, Response, Request, RequestMethod, Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { MnUploadService } from '../mn-upload.service';
import { MnAuthService } from '../mn-auth.service';
import { MnProfileService } from '../mn-profile.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';


@Component({
  selector: 'app-metaform',
  templateUrl: './metaform.component.html',
  styleUrls: ['./metaform.component.css'],
})
export class MetaformComponent implements OnInit {
    
    constructor(private http:AuthHttp, private route:ActivatedRoute, private us:MnUploadService, private router:Router, private auth:MnAuthService, private profile:MnProfileService, private toastyService:ToastyService, private toastyConfig: ToastyConfig){
        this.toastyConfig.theme = 'material';
    }
    
    name = "";
    fields = [];
    loaded_files = {};
    loaded_files_a = {};

    mode="test";
    //mode = "";

    form_id = -1;
    report_id = -1;
    editable = true;

    author_id;

    report = {};

    fileuploaded(x){
        console.log(x);
    }
    
    ngOnInit(){
        
        this.route.params.subscribe(params => {
            this.form_id = +params["id"];
            this.report_id = +params["iid"];
        
            console.log(this.report_id);
                
                
            this.http.get("http://"+this.mode+"api.ascuoladiopencoesione.it/meta/compiledform/"+this.report_id+"/?format=json").toPromise()
                .then(x=>{
                    let jj = x.json();
                    this.author_id = jj.author;
                    if (jj.author_name != this.profile.userData.user)
                        this.router.navigate(["/login"]);
                    
                    this.preparefields(jj.form);
                    this.preparevalues(jj);
                    this.editable = !jj.published;
                });
    
        });

    }
    
    preparevalues(form:any){
        for (let f of form.fields){
            if (f.valid){
                for (let fo of this.fields){
                    if(f.field == fo.id){
                        if(fo.t.t == "point") {
                            this.report[fo.field_name]["addr"] = f.value.addr;
                            this.report[fo.field_name]["geoj"] = f.value.geoj;
                        } else {
                          console.log(fo);
                          console.log(f.value);
                            this.report[fo.field_name] = f.value;
                        }
                    }
                }
            }
        }
    }
    

    preparefields(form:any){
        this.name = form.name;
        this.fields = form.fields;
        for (let f of this.fields)
            if(["point","multiple c"].indexOf(f.t.t) >=0)
                this.report[f.field_name] = {};
    }
    
    the_dict = {}
    
    getBaseFields(){
        return {};
    }
    
    storeData(event){
        this.errs = {};
        this.report.__cf = this.report_id;
        console.log(this.report);
        this.save(this.report);
    }
    
    submitData(event){
        this.errs = {};
        if (confirm('Inviare il report? Una volta inviato non sarà più possibile modificarlo.')) {
            this.report.__cf = this.report_id;
            //this.report.__final = true;
            console.log(this.report);
            this.save(this.report, true).then(x=>{
                if(x) // finalized
                    this.editable = false;
                    this.router.navigate(["/report/thanks", {"report":this.report_id, "author":this.author_id, "mode":this.mode}]);
            });
        } else {
        }
    }

    save(item, final=false){
        item.asocform = this.form_id;
        item.__final = final;
        this.errs = {};
        return new Promise((resolve,reject) =>{this.http.post("http://"+this.mode+"api.ascuoladiopencoesione.it/metaform/",JSON.stringify(item)).toPromise()
            .then(x => {
                this.toastyService.info("Report Salvato!");
                //alert("Report Salvato!");
                if(final){
                this.toastyService.info("Inviato!");
                    //alert("Inviato!");
                    resolve(true);
                    
                }
                this.toastyService.info("Ora puoi vedere l'anteprima.");
                //alert("Ora puoi vedere l'anteprima.");
                resolve(false);
            })
            .catch(err => {
                this.toastyService.error("C'è stato un problema nell'invio.");
                //alert("C'è stato un problema nel salvataggio.");
                this.show_errors(err.json());
            });
        });
    }
    storeAndSubmitData(event){
        this.submitData(event);
    }
    
    errs = {}
    
    show_errors(errs){
        this.errs = {};
        for (let err of errs.errors)
        this.errs[err.field] = err.error;
    }
    
    cerca(addrel, geojel, mapel){
        this.http.get("http://api.cityopensource.com/api/v1/geocode?address="+addrel.value).toPromise().then(x=>{
            let xx = x.json();
            this.report[geojel.field_name]["geoj"] = xx;
            mapel.setCenter(xx);
            mapel.setZoom(18);
            mapel.addMarker(xx);
        });
    }
}
