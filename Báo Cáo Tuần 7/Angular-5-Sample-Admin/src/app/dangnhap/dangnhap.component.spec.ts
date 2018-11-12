/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DangnhapComponent } from './dangnhap.component';

describe('DangnhapComponent', () => {
  let component: DangnhapComponent;
  let fixture: ComponentFixture<DangnhapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DangnhapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DangnhapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
