import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ToDo from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class ToDoHttpService {
  private ApiURL: string = 'https://jsonplaceholder.typicode.com/users';
  constructor(private httpclient: HttpClient) {}

  getToDos(): Observable<ToDo[]> {
    return this.httpclient.get<ToDo[]>(this.ApiURL);
  }

  createToDos(payload: ToDo): Observable<ToDo> {
    return this.httpclient.post<ToDo>(this.ApiURL, JSON.stringify(payload), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
