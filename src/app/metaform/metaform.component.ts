import { Component, OnInit } from '@angular/core';
import { Http, Response, Request, RequestMethod, Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { MnUploadService } from '../mn-upload.service';

@Component({
  selector: 'app-metaform',
  templateUrl: './metaform.component.html',
  styleUrls: ['./metaform.component.css'],
})
export class MetaformComponent implements OnInit {
  constructor(private http:AuthHttp, private route:ActivatedRoute, private us:MnUploadService) {}
    name = "";
    fields = [];
    loaded_files = {};
    loaded_files_a = {};

    form_id = -1;
    report_id = -1;
    editable = true;

    report = {};

    fileuploaded(x){
        console.log(x);
    }

    ngOnInit(){
        this.form_id = this.route.snapshot.params["id"];
        this.report_id = this.route.snapshot.params["iid"];
        
        console.log(this.report_id);
            
            
        this.http.get("http://api.ascuoladiopencoesione.it/meta/compiledform/"+this.report_id+"/?format=json").toPromise()
            .then(x=>{
                let jj = x.json();
                this.preparefields(jj.form);
                this.preparevalues(jj);
                this.editable = !jj.published;
            });
     
    }
    
    preparevalues(form:any){
        for (let f of form.fields){
            for (let fo of this.fields){
                if(f.field == fo.id)
                    this.report[fo.field_name] = f.value;
            }
        }
    }

    preparefields(form:any){
        this.name = form.name;
        this.fields = form.fields;
    }
    
    the_dict = {}
    
    getBaseFields(){
        return {};
    }
    
    storeData(event){
        this.report.__cf = this.report_id;
        console.log(this.report);
        this.save(this.report);
    }
    
    submitData(event){
        if (confirm('Finalizzare il report? Una volta finalizzato non sarà più possibile modificarlo.')) {
            this.report.__cf = this.report_id;
            this.report.__final = true;
            console.log(this.report);
            this.save(this.report);
        } else {
        }
        
    }

    save(item){
        item.asocform = 1;
        
        this.http.post("http://api.ascuoladiopencoesione.it/metaform/",JSON.stringify(item)).toPromise()
            .then(x => {})
            .catch(err => {});
    }
    storeAndSubmitData(event){
        this.submitData(event);
    }
}
