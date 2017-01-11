/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AsocReportThanksComponent } from './asoc-report-thanks.component';

describe('AsocReportThanksComponent', () => {
  let component: AsocReportThanksComponent;
  let fixture: ComponentFixture<AsocReportThanksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsocReportThanksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsocReportThanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
