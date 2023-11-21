import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Todo, TodoService } from './../todo.service';

@Component({
  standalone: true,
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  imports: [CommonModule, ReactiveFormsModule]
})
export class TodoComponent implements OnInit {
  todos?: Observable<Todo[]>;
  singleTodo?: Observable<Todo>;
  todoForm: FormGroup;

  constructor(
    private todoService: TodoService,
    private formBuilder: FormBuilder) {

    this.todoForm = this.formBuilder.group({
      'todo': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.todos = this.todoService.todos;
    this.singleTodo = this.todoService.todos.pipe(
      map(todos => todos.find(item => item.id === '1'))
    ) as Observable<Todo>;

    this.todoService.loadAll();
    this.todoService.load('1');
  }

  onSubmit() {
    this.todoService.create({ value: this.todoForm.controls['todo'].value });
  }

  deleteTodo(todoId: number) {
    this.todoService.remove(todoId);
  }
}