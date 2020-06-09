import { Component, OnInit, Inject } from '@angular/core';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { TasksService } from 'src/app/services/tasks.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomValidations } from '../validators/custom-validation';

@Component({
  selector: 'app-dialog-task-form',
  templateUrl: './dialog-task-form.component.html',
  styleUrls: ['./dialog-task-form.component.sass']
})
export class DialogTaskFormComponent implements OnInit {
  addTaskForm: FormGroup;

  constructor( public dialogRef: MatDialogRef<DialogTaskFormComponent>,
    private taskService: TasksService,
    private customValidation: CustomValidations,
    @Inject(MAT_DIALOG_DATA) public taskListId: number
    ) { }

  ngOnInit(): void {
    this.addTaskForm = new FormGroup({
      name: new FormControl(
        null,
        [Validators.required],
        [this.customValidation.checkDuplicateName("task", "name")]
      ),
      description: new FormControl(null, null)
    });
  }
  addTask() {
    let result = this.taskService.addTask(
      this.addTaskForm.controls['name'].value,
      this.addTaskForm.controls['description'].value,
      this.taskListId
    );
    this.dialogRef.close(result);
  }
  onCancel() {
    this.dialogRef.close();
  }
}
