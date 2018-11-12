/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DangkyComponent } from './dangky.component';

describe('DangkyComponent', () => {
  let component: DangkyComponent;
  let fixture: ComponentFixture<DangkyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DangkyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DangkyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
