import "./Todo.css";
import { useState } from "react";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { TodoDate} from "./TodoDate";
import { getlocalStorageTodoData, setlocalStorageTodoData } from "./LocalStorage";

export const Todo = () => {
  const [task, setTask] = useState( ()=> getlocalStorageTodoData());

  const handleFormSubmit = (inputValue) => {
    const{id, content, checked}=inputValue;
    if (!content) return;
    const ifTodoContentMatched =task.find((curTask)=> curTask.content===content);
    if(ifTodoContentMatched) return;
    setTask((prevTask) => [...prevTask, {id, content, checked}]);
  };
  

  setlocalStorageTodoData(task);

  const handleDeleteTodo = (value) => {
    const updatedTask = task.filter((curTask) => curTask.content !== value);
    setTask(updatedTask);
  };

  const handleClearTodoList = () => {
    setTask([]);
  };

    const handleCheckedTodo =(content)=> {
      const updatedTask= task.map((curTask)=>{
        if(curTask.content==content){
          return{...curTask, checked: !curTask.checked};
        }else{
          return curTask;
        }
      });
    setTask(updatedTask); 
  };


  return (
    <section className="todo-container">
      <header className="header">
        <h1>TODO List</h1>
        <TodoDate />
      </header>

      <TodoForm onAddTodo={handleFormSubmit} />

      <section className="myUnOrdList">
        <ul>
          {task.map((curTask ) => (
            <TodoList
              key={curTask.id }
              data={curTask.content}
              checked= {curTask.checked}
              onHandleDeleteTodo={handleDeleteTodo}
              onHandleCheckedTodo={handleCheckedTodo}

            />
          ))}
        </ul>
      </section>

      <section>
        <button className="Clear-btn" onClick={handleClearTodoList}>
          Clear all
        </button>
      </section>
    </section>
  );
};