import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventlocationdetailsComponent } from './eventlocaltiondetails.component';


describe('EventlocationdetailsComponent', () => {
  let component: EventlocationdetailsComponent;
  let fixture: ComponentFixture<EventlocationdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventlocationdetailsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EventlocationdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
