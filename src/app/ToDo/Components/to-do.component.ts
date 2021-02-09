import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as ToDoActions from '../todo.action';
import ToDo from '../todo.model';
import ToDoState from '../todo.state';
import { ToDoHttpService } from '../todo.httpservice';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {

  todo$: Observable<ToDoState>;
  ToDoSubscription: Subscription;
  ToDoList: ToDo[] = [];
  public admin: any = {};
  Title: string = '';
  todoError: Error = null;
  public submitted = false;
  constructor(private store: Store<{ todos: ToDoState }>, public todoService: ToDoHttpService) {
    this.todo$ = store.pipe(select('todos'));
  }

  ngOnInit() {
    this.admin.completed= false;
    this.ToDoSubscription = this.todo$
      .pipe(
        map(x => {
          this.ToDoList = x.ToDos;
          this.todoError = x.ToDoError;
        })
      )
      .subscribe();

    this.store.dispatch(ToDoActions.BeginGetToDoAction());
  }



  createToDo(form, admin) {
    if(form.valid){
    this.submitted = true;
    this.todoService.createToDos("",form.value,"post").subscribe(value => {
      console.log("POST METHOD", value);
    }
   )
   alert("Task added");
   location.reload();
    }
    else {

    }
  }
    // const todo: ToDo = { Id:this.id, Title: this.Title, Completed: this.completed };
    // this.store.dispatch(ToDoActions.BeginCreateToDoAction({ payload: todo }));
    // this.Title = '';
    // this.completed = false;


  ngOnDestroy() {
    if (this.ToDoSubscription) {
      this.ToDoSubscription.unsubscribe();
    }
  }
}
