import { createSlice } from '@reduxjs/toolkit';

const initialState={
  todoList:[]
}

const todoSlice = createSlice({
  name:'todo',
  initialState,
  reducers :{
    addToDo:(state,action)=>{
      state.todoList.push(action.payload)
    },
    removeToDo:(state,action)=>{
      state.todoList=state.todoList.filter((todo)=>todo.id!==action.payload);
    },
  }
});

export const { addToDo,removeToDo } = todoSlice.actions;
export default todoSlice.reducer;