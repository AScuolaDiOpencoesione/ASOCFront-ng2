/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MnCkeditComponent } from './mn-ckedit.component';

describe('MnCkeditComponent', () => {
  let component: MnCkeditComponent;
  let fixture: ComponentFixture<MnCkeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MnCkeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MnCkeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
