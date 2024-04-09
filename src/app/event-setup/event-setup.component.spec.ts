import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSetupComponent } from './event-setup.component';

describe('EventSetupComponent', () => {
  let component: EventSetupComponent;
  let fixture: ComponentFixture<EventSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventSetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
