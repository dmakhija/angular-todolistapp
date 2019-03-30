import { Component } from '@angular/core';
import {environment} from './../environments/environment';
import {ToDoService} from './shared/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[ToDoService]
})
export class AppComponent {
  appTitle = ' To Do List App';
  headerBgColor:string;
  items: any[];

  constructor(private dbService:ToDoService){
    this.headerBgColor=environment.jumboBgColor;
  }

  ngOnInit(){    
    this.getAllItems();
  }

  getAllItems(){
    this.dbService.getAllTasks().snapshotChanges().subscribe(tasklist=>{
      this.items=[];
      tasklist.forEach(task=>{
        this.items.push({
          id:task.key,
          value:task.payload.toJSON()
        }); 
      });
      
      this.items.sort((a,b)=>{
        return a.value.checked-b.value.checked;
      });
    });
  }

 

  addItem(ele){
    this.dbService.addTask(ele.value);
    ele.value="";   
  }

  alterItemCheck(id:string, ischecked:boolean)
  {
    this.dbService.toggleCheck(id,!ischecked);
  }

  removeItem(id:string)
  {
    this.dbService.removeTask(id);
  }

 }
