import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Todo, User } from '../_models';
import { UserService, AlertService } from '../_services';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css'],
})
export class TodolistComponent implements OnInit {

  public currentUser: User;
  public newTodo: string;
  public todos: Todo[];
  public todoObj: Todo;

  constructor(
    private userService: UserService,
    private alertService: AlertService) { }

  public ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.newTodo = '';
    this.todos = this.currentUser.todos;
  }

  public addTodo(event): void {
    this.todoObj = {
      id: this.todos.length ? this.todos.length + 1 : 1,
      text: this.newTodo,
      completed: false
    };

    this.todos.push(this.todoObj);
    this.currentUser.todos = this.todos;

    this.userService.update(this.currentUser)
    .subscribe(
        data => {
            // this.alertService.success('Add successful', true);
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            this.newTodo = '';
        },
        error => {
            this.alertService.error(error);
            // this.loading = false;
        });

    event.preventDefault();
  }

  public updateTodos(): void {
    this.currentUser.todos = this.todos;
    this.userService.update(this.currentUser)
    .subscribe(
        data => {
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            this.newTodo = '';
        },
        error => {
            this.alertService.error(error);
        });
  }

  public deleteTodo(index): void {
    this.todos.splice(index, 1);
    this.currentUser.todos = this.todos;
    this.userService.update(this.currentUser)
    .subscribe(
        data => {
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            this.newTodo = '';
        },
        error => {
            this.alertService.error(error);
        });

  }

  public deleteSelectedTodos(): void {
    for (let i = (this.todos.length - 1); i > -1; i--) {
      if (this.todos[i].completed) {
        this.todos.splice(i, 1);
      }
    }
  }

}
