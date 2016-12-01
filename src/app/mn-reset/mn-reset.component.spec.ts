/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MnResetComponent } from './mn-reset.component';

describe('MnResetComponent', () => {
  let component: MnResetComponent;
  let fixture: ComponentFixture<MnResetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MnResetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MnResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
