import { Injectable } from '@angular/core';
import { TaskListModel } from './taskList.model';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { throwError } from 'rxjs';
import { map, retry, catchError,  } from "rxjs/operators";
import { __values } from 'tslib';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {

  constructor(private httpClient: HttpClient ) {

  }

  addTaskList(name: string, description: string) {
    let data = {name: name, description: description};
    return this.httpClient.post<TaskListModel>(environment.apiUrl+'taskList', data ).pipe(
      retry(1),
      map(data => data ),
      catchError( err => this.handleError(err))
    );

  }

  getTaskList() {
    return this.httpClient.get<TaskListModel[]>(environment.apiUrl+'taskList?_sort=order')
    .pipe(
      retry(1),
      map(data => data),
      catchError( err => this.handleError(err))
    );
  }
  deleteTaskList(taskListId) {
    return this.httpClient.delete(environment.apiUrl+'taskList/'+taskListId)
    .pipe(
      retry(1),
      map(data => data),
      catchError( err => this.handleError(err))
    );
  }

  findTaskListByFieldValue(field: string, value: string) {
    return this.httpClient.get<TaskListModel[]>(`${environment.apiUrl}taskList?${field}=${value}`)
    .pipe(
      retry(1),
      map(data => data),
      catchError( err => this.handleError(err))
    );
  }

  updateTaskList(taskListId, data) {
    console.log(taskListId, data);
    return this.httpClient.put<TaskListModel>(`${environment.apiUrl}taskList/${taskListId}`, JSON.stringify(data))
    .pipe(
      retry(1),
      map(data => data),
      catchError( err => this.handleError(err))
    );
  }

  private handleError(err) {
    const errorMsg = err.message || 'Error: Unable to complete request.';
    return throwError(errorMsg);
  }
}
