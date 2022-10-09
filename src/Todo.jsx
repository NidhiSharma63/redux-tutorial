import React,{useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { addToDo,removeToDo ,editToDo} from './redux/todoSlice';
import { v4 as uuidv4 } from 'uuid';

const Todo = () => {

  const [taskValue, setTaskValue] = useState('');
  const todoList = useSelector(state=>state.todo.todoList);
  const dispatch = useDispatch();
  
  const handleSubmit = () =>{
    dispatch(addToDo({id:uuidv4(),value:taskValue}));
    setTaskValue('')
  };

  const [editToDoObj,setTodoObj] = useState({});
  const [isEdit,setIsEdit] = useState(false);

  const editHandler = (taskobj) =>{
    setTodoObj(taskobj);
    setTaskValue(taskobj.value);
    setIsEdit(true);
  }

  const saveBtnHandler = () =>{
    dispatch(editToDo({id:editToDoObj.id,value:taskValue}));
    setTaskValue('');
    setIsEdit(false);
  }

  return (
    <>
      <div className='add-todo'>
        <input 
          type='text'  
          placeholder="add todo...."
          value={taskValue}
          onChange={(e)=>setTaskValue(e.target.value)}
        />
        {
          isEdit ?
          <button
            onClick={()=>saveBtnHandler()}>Save
          </button>
          :
          <button
            onClick={handleSubmit}>Add
          </button>
        }
      </div>
      <div className="show-todo">
        {
          todoList.map((todo)=>(
            <div key={todo.id} className="item">
              <p>{todo.value}</p>
              <div>
                <button
                  className='deletebtn'
                  onClick={()=>dispatch(removeToDo(todo.id))}
                >Delete
                </button>
                <button
                  className='editbtn'
                  onClick={()=>editHandler(todo)}
                >Edit
                </button>
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default Todo;