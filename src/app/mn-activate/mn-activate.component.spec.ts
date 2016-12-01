/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MnActivateComponent } from './mn-activate.component';

describe('MnActivateComponent', () => {
  let component: MnActivateComponent;
  let fixture: ComponentFixture<MnActivateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MnActivateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MnActivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
