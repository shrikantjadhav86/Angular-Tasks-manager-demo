import { Component, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { TaskListService } from 'src/app/services/task-list.service';

@Component({
  selector: 'app-dialog-task-list-form',
  templateUrl: './dialog-task-list-form.component.html',
  styleUrls: ['./dialog-task-list-form.component.sass']
})
export class DialogTaskListFormComponent implements OnInit {
  name: string = '';
  description: string = '';

  constructor(
    public dialogRef: MatDialogRef<DialogTaskListFormComponent>,
    private taskListService: TaskListService
  ) {}


  ngOnInit(): void {
  }

  addTaskList(formData: NgForm) {
    const result = this.taskListService.addTaskList(formData.value.name, formData.value.description);
    this.dialogRef.close(result);
  }
  onCancel() {
    this.dialogRef.close();
  }
}
