import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamingsListComponent } from './streamings-list.component';

describe('StreamingsListComponent', () => {
  let component: StreamingsListComponent;
  let fixture: ComponentFixture<StreamingsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreamingsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
