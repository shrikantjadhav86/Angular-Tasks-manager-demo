import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TasksService } from '../services/tasks.service';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        MatToolbarModule,
        MatMenuModule,
        MatCardModule,
        MatButtonModule,
        DragDropModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatIconModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatTooltipModule
      ],
      providers: [
        TasksService,
        MatDialog,
        MatSnackBar
      ],
      declarations: [ TaskListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    component.ngOnInit;
    tick(2000);
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
