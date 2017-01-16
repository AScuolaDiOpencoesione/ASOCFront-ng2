/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MnOembedComponent } from './mn-oembed.component';

describe('MnOembedComponent', () => {
  let component: MnOembedComponent;
  let fixture: ComponentFixture<MnOembedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MnOembedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MnOembedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
