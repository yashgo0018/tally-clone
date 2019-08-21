import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookLoginButtonComponent } from './facebook-login-button.component';

describe('FacebookLoginButtonComponent', () => {
  let component: FacebookLoginButtonComponent;
  let fixture: ComponentFixture<FacebookLoginButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacebookLoginButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacebookLoginButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
