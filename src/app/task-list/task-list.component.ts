import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { DialogTaskFormComponent } from '../shared/dialog-task-form/dialog-task-form.component';

import { TaskListModel } from '../services/taskList.model';
import { TasksService } from '../services/tasks.service';
import { TaskModel } from '../services/task.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.sass']
})
export class TaskListComponent implements OnInit {
  @Input("taskList") taskList: TaskListModel;
  @Output("onDeleteList") onDeleteList = new EventEmitter();
  tasks: TaskModel[] = null;
  isDataLoaded = false;

  constructor(
    private taskService: TasksService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.taskService.getTasks(this.taskList.id).subscribe(
      data => {
        this.tasks = data;
        this.isDataLoaded = true;
      }, error => {
        this.showSnackBar("error while loading takss "+error);
        this.isDataLoaded = true;
      }
    );
  }
  showAddTask() {
    const dialogRef = this.dialog.open(DialogTaskFormComponent, {
      width: '250px',
      data: this.taskList.id
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
        result.subscribe( data => {
          this.showSnackBar("Task added successfully...");
          this.tasks.push(data);
        }, error => {
          this.showSnackBar("Error while adding task list "+error);
        });
    });
  }

  deleteList(id) {
    let confirmResp = confirm(`Are you sure you want to delete List ${this.taskList.name}`);
    let errors = [];
    if(confirmResp) {
      this.tasks.forEach( task => {
        this.taskService.deleteTask(task.id).subscribe(
          data => data,
          error=> errors.push(error)
        )
      });
      if(errors.length)
        this.showSnackBar(errors.join())
      else
        this.onDeleteList.emit(id);
    }
  }

  deleteTask(id) {
    this.taskService.deleteTask(id).subscribe(
    data => {
      this.showSnackBar("Task deleted successfully...");
      this.tasks = this.tasks.filter( task => task.id != id);
    }, error => {
      this.showSnackBar("Error while deleting taksList "+ error);
    }
  );
  }


  drop(event: CdkDragDrop<string[]>, taskListId: number) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);


                        //const status = this.allStatuses[event.container.id.substr("cdk-drop-list-".length)];
      let taskToUpdate:TaskModel = <any> event.container.data[event.currentIndex];
      taskToUpdate.taskListId = taskListId;

      this.taskService.updateTask(taskToUpdate).subscribe(
        data =>{
          if(data) {
            this.showSnackBar("Task moved successfully...");
          }
        }, error => {
          this.showSnackBar("Error while updating task "+ error);
        }
      )

        /*
      const currentTaskIndex = this.taskService.tasks.findIndex(task =>
        task.taskName === taskToUpdate.taskName
      );
      */
    }
  }
  private showSnackBar(err) {
    this._snackBar.open(err)._dismissAfter(2000);
  }

}
