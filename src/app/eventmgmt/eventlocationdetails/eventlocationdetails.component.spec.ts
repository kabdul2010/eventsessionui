import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventviewlocationdetailsComponent } from '../eventviewlocationdetails/eventviewlocaltiondetails.component';


describe('EventviewlocationdetailsComponent', () => {
  let component: EventviewlocationdetailsComponent;
  let fixture: ComponentFixture<EventviewlocationdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventviewlocationdetailsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EventviewlocationdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
