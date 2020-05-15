import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamingListComponent } from './streaming-list.component';

describe('StreamingListComponent', () => {
  let component: StreamingListComponent;
  let fixture: ComponentFixture<StreamingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreamingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
