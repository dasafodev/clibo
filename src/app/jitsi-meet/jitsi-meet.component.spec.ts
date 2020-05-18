import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JitsiMeetComponent } from './jitsi-meet.component';

describe('JitsiMeetComponent', () => {
  let component: JitsiMeetComponent;
  let fixture: ComponentFixture<JitsiMeetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JitsiMeetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JitsiMeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
