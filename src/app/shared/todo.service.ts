import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  todolist:AngularFireList<any>;  

  constructor(private firebasedb: AngularFireDatabase) {
  }

  getAllTasks()
  {
    this.todolist=this.firebasedb.list('/tasks');
    return this.todolist;
  }

  addTask(itemTxt)
  {
    this.todolist.push({
      checked: false,
      title: itemTxt
    });
  }

  toggleCheck(id:string,isChecked:boolean){
    this.todolist.update(id,{checked:isChecked});
  }

  removeTask(id:string)
  {
    this.todolist.remove(id);
  }

}
