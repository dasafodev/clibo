import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamingDetailComponent } from './streaming-detail.component';

describe('StreamingDetailComponent', () => {
  let component: StreamingDetailComponent;
  let fixture: ComponentFixture<StreamingDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreamingDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
