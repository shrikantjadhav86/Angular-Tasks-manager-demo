import { Component, Output } from '@angular/core';
import { TaskListModel } from './services/taskList.model';
import { TaskListService } from './services/task-list.service';
import {MatDialog} from '@angular/material/dialog';
import { DialogTaskListFormComponent } from './shared/dialog-task-list-form/dialog-task-list-form.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'travisca-task-manager';
  taskLists: TaskListModel[];
  isDataLoaded = false;

  constructor(
    private tasksListService: TaskListService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.tasksListService.getTaskList().subscribe(
       data => {
         this.taskLists = data
         this.isDataLoaded = true;
      }, error => {
        this.showSnackBar("Error while fetching tasklist"+error);
        this.isDataLoaded = true;
      }
    );
  }
  showAddTaskList() {
    const dialogRef = this.dialog.open(DialogTaskListFormComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
        result.subscribe( data => {
          this.showSnackBar("Tasklist added successfully...");
          this.taskLists.push(data);
        }, error => {
          this.showSnackBar("Error while adding task list "+error);
        });
    });
  }
  deleteTaskList(id:number) {
    this.tasksListService.deleteTaskList(id).subscribe(
      data => {
        this.showSnackBar("Tasklist deleted successfully...");
        this.taskLists = this.taskLists.filter( taskList => taskList.id != id);
      }, error => {
        this.showSnackBar("Error while deleting taksList "+ error);
      }
    );

  }

  private showSnackBar(err) {
    this._snackBar.open(err)._dismissAfter(2000);
  }
}
