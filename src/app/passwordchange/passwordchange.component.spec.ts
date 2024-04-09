import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordChangeComponent } from './passwordchange.component';

describe('PasswordchangeComponent', () => {
  let component: PasswordChangeComponent;
  let fixture: ComponentFixture<PasswordChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordChangeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PasswordChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
