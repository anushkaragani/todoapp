import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ToDo from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class ToDoHttpService {
  private ApiURL: string = 'http://localhost:3000/todo';
  constructor(private httpclient: HttpClient) {}

  getToDos(): Observable<ToDo[]> {
    return this.httpclient.get<ToDo[]>(this.ApiURL);
  }

  createToDos(key, data, post): Observable<any> {
      return this.httpclient.post(this.ApiURL, data);
  }


}
