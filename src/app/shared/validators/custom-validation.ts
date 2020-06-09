import { ValidationErrors, NgForm, AbstractControl, AsyncValidatorFn, FormGroup } from '@angular/forms';
import { TaskListService } from 'src/app/services/task-list.service';
import { isBuffer } from 'util';
import { Injectable } from '@angular/core';
import { debounceTime, switchMap, throttleTime, distinct, map, distinctUntilChanged, mapTo } from 'rxjs/operators';
import { TasksService } from 'src/app/services/tasks.service';

@Injectable({
  providedIn: 'root'
})
export class CustomValidations {

  constructor(
    private taskListService: TaskListService,
    private taskService: TasksService

  ) {}
  /*
    check for duplicate value in the dataset and for the field name provided
  */
  checkDuplicateName(dataset: string, fieldName: string): AsyncValidatorFn {
    return (control: AbstractControl) :
      Promise<{ [key: string]: any } | null> => {
      return new Promise((resolve, reject) => {
        control.valueChanges.pipe(
          map(data => data),
          debounceTime(1000),
          ).subscribe( value => {
            if(dataset === "taskList") {
              this.taskListService.findTaskListByFieldValue(fieldName, value).subscribe(
                data => {
                  if(data.length)
                    resolve({'checkDuplicate': true})
                  else
                    resolve(null)
                }, error => resolve(null)
              )
            } else if(dataset === "task") {
              this.taskService.findTaskListByFieldValue(fieldName, value).subscribe(
                data => {
                  if(data.length)
                    resolve({'checkDuplicate': true})
                  else
                    resolve(null)
                }, error => {
                  resolve(null)
                }
              )
            }
          }
        )

      });
    }
  }
}
