import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConpersoComponent } from './conperso.component';

describe('ConpersoComponent', () => {
  let component: ConpersoComponent;
  let fixture: ComponentFixture<ConpersoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConpersoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConpersoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
