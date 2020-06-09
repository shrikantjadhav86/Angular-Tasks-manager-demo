import { Component, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskListService } from 'src/app/services/task-list.service';
import { CustomValidations } from '../validators/custom-validation';


@Component({
  selector: 'app-dialog-task-list-form',
  templateUrl: './dialog-task-list-form.component.html',
  styleUrls: ['./dialog-task-list-form.component.sass']
})
export class DialogTaskListFormComponent implements OnInit {
  addTaskListForm: FormGroup;
  name: string = '';
  description: string = '';

  constructor(
    public dialogRef: MatDialogRef<DialogTaskListFormComponent>,
    private taskListService: TaskListService,
    private customValidation: CustomValidations
  ) {}


  ngOnInit(): void {
    this.addTaskListForm = new FormGroup({
      name: new FormControl(
        null,
        [Validators.required],
        [this.customValidation.checkDuplicateName("taskList", "name")]
      ),
      description: new FormControl(null, null)
    });
  }

  addTaskList() {
    const result = this.taskListService.addTaskList(
      this.addTaskListForm.controls['name'].value,
      this.addTaskListForm.controls['description'].value
    );
    this.dialogRef.close(result);
  }
  onCancel() {
    this.dialogRef.close();
  }
}
