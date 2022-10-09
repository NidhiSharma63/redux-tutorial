import React,{useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { addToDo,removeToDo } from './redux/todoSlice';
import { v4 as uuidv4 } from 'uuid';

const Todo = () => {

  const [taskValue, setTaskValue] = useState('')
  const todoList = useSelector(state=>state.todo.todoList);
  const dispatch = useDispatch();

  const handleSubmit = () =>{
    dispatch(addToDo({id:uuidv4(),value:taskValue}));
    setTaskValue('')
  };

  // console.log(todoList)
  return (
    <>
      <div className='add-todo'>
        <input 
          type='text'  
          placeholder="add todo...."
          value={taskValue}
          onChange={(e)=>setTaskValue(e.target.value)}
        />
        <button 
         onClick={handleSubmit}>Add
        </button>
      </div>
      <div className="show-todo">
        {
          todoList.map((todo)=>(
            <div key={todo.id}>
              <p>{todo.value}</p>
              <button
                onClick={()=>dispatch(removeToDo(todo.id))}>Delete</button>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default Todo;