import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TasksService } from 'src/app/services/tasks.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-task-form',
  templateUrl: './dialog-task-form.component.html',
  styleUrls: ['./dialog-task-form.component.sass']
})
export class DialogTaskFormComponent implements OnInit {
  name:string = '';
  description: string = '';
  constructor( public dialogRef: MatDialogRef<DialogTaskFormComponent>,
    private taskService: TasksService,
    @Inject(MAT_DIALOG_DATA) public taskListId: number
    ) { }

  ngOnInit(): void {
  }
  addTask(formData: NgForm) {
    let result = this.taskService.addTask(formData.value.name, formData.value.description, this.taskListId);
    this.dialogRef.close(result);
  }
  onCancel() {
    this.dialogRef.close();
  }
}
