import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TodoService } from './todo.service';
import { TodoComponent } from './todo/todo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  providers: [TodoService],
  imports: [TodoComponent, HttpClientModule]
})
export class AppComponent  {
}
