import { Component, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { MnUploadService } from '../mn-upload.service';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { forwardRef } from '@angular/core';
const noop = () => {
};
export const MN_UPLOAD_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MnUploadComponent),
    multi: true
};

@Component({
  selector: 'mn-upload',
  templateUrl: 'mn-upload.component.html',
  styleUrls: ["mn-upload.component.css"],
  providers: [MN_UPLOAD_CONTROL_VALUE_ACCESSOR]
})
export class MnUploadComponent implements ControlValueAccessor{
  @Input() field_name;
  @Input() required = false;
  @Input() mode;
  @Output() fileuploaded = new EventEmitter<any>();
  file_uploaded = false;
  file_uploading = false;
  upload_url = "";
  
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  
  //get accessor
  get value(): any {
      return this.upload_url;
  };

  //set accessor including call the onchange callback
  set value(v: any) {
      if (v !== this.upload_url) {
          this.upload_url = v;
          this.file_uploaded = true;
          this.onChangeCallback(v);
      }
  }
  
  //Set touched on blur
  onBlur() {
      this.onTouchedCallback();
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
      if (value !== this.upload_url) {
          this.upload_url = value;
          this.file_uploaded = true;
      }
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
      this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
      this.onTouchedCallback = fn;
  }
  
  constructor(private us:MnUploadService) { }
  ngOnInit(){
    console.log(this.field_name);
    console.log(this.required);
  }
  loadFile(event, name){
    this.file_uploading=true;
    this.us.uploadFiles(event.target.files).then(x=>{
      console.log(x);
      this.value = x;
      console.log("done!!");
      this.file_uploaded = true;
      this.file_uploading = false;
      this.fileuploaded.next(x);
    }).catch(y=>{
      console.log("fail");
      this.file_uploaded = false;
      this.file_uploading = false;
    });
  }
  
  removeFile(){
    this.value = "";
    this.file_uploaded = false;
  }
}
