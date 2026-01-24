 const todoKey="reactTodo";   
export const getlocalStorageTodoData =()=>{
    const rawTodos =localStorage.getItem(todoKey);
    if(!rawTodos) return[];
    return JSON.parse(rawTodos);
};

    
export const setlocalStorageTodoData =(task)=>{
    return localStorage.setItem(todoKey, JSON.stringify(task));
};