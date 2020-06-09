import { Component, Output } from '@angular/core';
import { TaskListModel } from './services/taskList.model';
import { TaskListService } from './services/task-list.service';
import {MatDialog} from '@angular/material/dialog';
import { DialogTaskListFormComponent } from './shared/dialog-task-list-form/dialog-task-list-form.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import { TasksService } from './services/tasks.service';
import { moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'travisca-task-manager';
  taskLists: TaskListModel[];
  isDataLoaded = false;
  isDark: boolean = true;
  themeSwichText: string = "Switch to light";
  constructor(
    private tasksListService: TaskListService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private taskService: TasksService) {

  }

  ngOnInit() {
    document.getElementById('themeLink').setAttribute( "href", `./assets/pink-bluegrey.css`);

    this.tasksListService.getTaskList().subscribe(
       data => {
         this.taskLists = data
         this.isDataLoaded = true;
      }, error => {
        this.showSnackBar("Error while fetching tasklist "+error);
        this.isDataLoaded = true;
      }
    );
  }
  ngDoCheck() {

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
  dropList(event) {
    console.log(this.taskLists[event.previousIndex]);
    moveItemInArray(this.taskLists, event.previousIndex, event.currentIndex);
  }

  private showSnackBar(err) {
    this._snackBar.open(err)._dismissAfter(2000);
  }

  changeTheme() {
    console.log(this.isDark);
    if(this.isDark) {
      this.isDark = false;
      this.themeSwichText = "Switch to dark";
      document.getElementById('themeLink').setAttribute( "href", `./assets/deeppurple-amber.css`);
    } else {
      this.isDark = true;
      this.themeSwichText = "Switch to light";
      document.getElementById('themeLink').setAttribute( "href", `./assets/pink-bluegrey.css`);
    }
  }
}
