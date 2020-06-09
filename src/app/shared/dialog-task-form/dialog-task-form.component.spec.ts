import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTaskFormComponent } from './dialog-task-form.component';

describe('DialogTaskFormComponent', () => {
  let component: DialogTaskFormComponent;
  let fixture: ComponentFixture<DialogTaskFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogTaskFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should called', () => {
    expect(component.ngOnInit).toHaveBeenCalledTimes(1)
  });

});
