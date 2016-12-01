/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MetaformComponent } from './metaform.component';

describe('MetaformComponent', () => {
  let component: MetaformComponent;
  let fixture: ComponentFixture<MetaformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetaformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetaformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
