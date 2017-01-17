import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { forwardRef } from '@angular/core';
const noop = () => {};
export const MN_OEMBED_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MnOembedComponent),
    multi: true
};

@Component({
  selector: 'mn-oembed',
  templateUrl: './mn-oembed.component.html',
  styleUrls: ['./mn-oembed.component.css']
  providers: [MN_OEMBED_CONTROL_VALUE_ACCESSOR]
})
export class MnOembedComponent implements ControlValueAccessor {
  @Input() field_name;
  @Input() required = false;
  @Input() mode;
  @Input() disabled;
  @Output() embedded = new EventEmitter<any>();

  constructor() { }

  oembed_data = "";
  oembed_done = false;

  ngOnInit() {
  }

  oembed(event, name){
    this.oembed_done = true;
  }
  removeFile(){
    this.oembed_data = "";
    this.oembed_done = false;
  }
  
  
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
          if(value == "" || value == null || value == undefined)
          this.file_uploaded = false;
          else 
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
}
