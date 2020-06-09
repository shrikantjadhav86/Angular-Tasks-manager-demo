import { Injectable } from '@angular/core';
import { TaskModel } from './task.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { retry, map, catchError } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  tasks :TaskModel[];

  constructor(private httpClient: HttpClient ) {
  }

  addTask(name: string, description: string, taskListId) {
    let data = {name, description, taskListId};
    return this.httpClient.post<TaskModel>(environment.apiUrl+'tasks', data ).pipe(
      retry(1),
      map(data => data ),
      catchError( err => this.handleError(err))
    );

  }

  getTasks(taskListId: number | '') {
    let url = environment.apiUrl+'tasks';
    if(taskListId)
      url = environment.apiUrl+'tasks?taskListId='+taskListId;
    return this.httpClient.get<TaskModel[]>(url)
    .pipe(
      retry(1),
      map(data => data),
      catchError( err => this.handleError(err))
    );
  }

  updateTask(data) {
    return this.httpClient.put<TaskModel>(environment.apiUrl+'tasks/'+data.id, data ).pipe(
      retry(1),
      map(data => data ),
      catchError( err => this.handleError(err))
    );

  }

  deleteTask(taskId) {
    return this.httpClient.delete(environment.apiUrl+'tasks/'+taskId)
    .pipe(
      retry(1),
      map(data => data),
      catchError( err => this.handleError(err))
    );
  }

  findTaskListByFieldValue(field: string, value: string) {
    return this.httpClient.get<TaskModel[]>(`${environment.apiUrl}tasks?${field}=${value}`)
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
