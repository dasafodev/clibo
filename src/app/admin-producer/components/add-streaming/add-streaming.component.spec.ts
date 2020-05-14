import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStreamingComponent } from './add-streaming.component';

describe('AddStreamingComponent', () => {
  let component: AddStreamingComponent;
  let fixture: ComponentFixture<AddStreamingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStreamingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStreamingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
