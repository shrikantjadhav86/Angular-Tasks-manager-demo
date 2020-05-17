import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskModel } from 'src/app/services/task.model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass']
})
export class TaskComponent implements OnInit {
  @Input("task") task: TaskModel;
  @Output("onDeleteTasks") onDeleteTasks = new EventEmitter;

  constructor(private taskService: TasksService) { }

  ngOnInit(): void {
  }

  deleteTask(id: number) {
    let confirmDelete = confirm("Are you sure you want to delete task with id "+id);
    if(confirmDelete)
      this.onDeleteTasks.emit();
  }
}
