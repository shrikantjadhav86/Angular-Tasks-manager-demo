import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTaskListFormComponent } from './dialog-task-list-form.component';

describe('DialogTaskListFormComponent', () => {
  let component: DialogTaskListFormComponent;
  let fixture: ComponentFixture<DialogTaskListFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogTaskListFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTaskListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
