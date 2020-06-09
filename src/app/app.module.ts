import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule }          from '@angular/forms';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskComponent } from './task-list/task/task.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaskListService } from './services/task-list.service';
import { DialogTaskListFormComponent } from './shared/dialog-task-list-form/dialog-task-list-form.component';
import { DialogTaskFormComponent } from './shared/dialog-task-form/dialog-task-form.component';
import { TasksService } from './services/tasks.service';
import { CustomValidations } from './shared/validators/custom-validation';


@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskComponent,
    DialogTaskListFormComponent,
    DialogTaskFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
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
    MatTooltipModule,
    MatSlideToggleModule
  ],
  providers: [TaskListService, TasksService, CustomValidations],
  bootstrap: [AppComponent]
})
export class AppModule { }
