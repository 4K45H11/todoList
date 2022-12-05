import React,{useEffect, useState} from 'react';
import "./style.css";
const Todo = () => {

  //getting data from local storage
  const getData=()=>{
    const lists= localStorage.getItem("todoList");
    if(lists){
      return  JSON.parse(lists);
    }
    else return [];
  };

  const[inputData,setInputData]=useState("");
  const[items,setItems]=useState(getData);
  const[editedItem,setEditedItem]=useState("");
  const[toggleAdd,setToggleAdd]=useState(false);
  // adding the items function
  const addItem=()=>{
    if(!inputData) alert('Please Enter your goal');
    else if(inputData && toggleAdd){
       setItems(items.map((curEl)=>{
          if(curEl.id===editedItem){
            return {...curEl,name:inputData};
          }
          else return curEl;
       }));
       setInputData("");
       setEditedItem(null);
       setToggleAdd(false);

    }
    else{
      const myNewInputData={
        id:new Date().getTime().toString(),
        name:inputData,
      }
      setItems([...items,myNewInputData]);
      setInputData("");
      // setToggleAdd(false);
    }
  }
  //editing the data

  const editItem=(index)=>{
     const item_todo_edited=items.find((curEl)=>{
        return curEl.id===index;
     });
     setEditedItem(index);
     setInputData(item_todo_edited.name)
     setToggleAdd(true);
  }

  // deleting items form the list

  const deleteItem=(index)=>{
     const upDateList=items.filter((curEl)=>{
      return curEl.id!==index;
     });
     setItems(upDateList);
  }
  //delete all

  const deleteAll=()=>{
    setItems([]);
  }
  //adding everyThing to the local Storage
  useEffect(()=>{
    localStorage.setItem("todoList",JSON.stringify(items));
  },[items])
  
  
  return (
    <>
    <div className="main-div">
        <div className="child-div">
            <figure>
                <img src="https://raw.githubusercontent.com/thapatechnical/reactjsByThapaTechnical/fdfcb12eac37b74d060e344e977df5749a939200/public/images/todo.svg" alt="logo" />
                <figcaption>Add Your List here ✍️</figcaption>
                
            </figure>
            <div className="addItems">
                <input type="text" placeholder='Add task...📝' className='form-control'
                value={inputData}
                onChange={(event)=>setInputData(event.target.value)}/>
                {toggleAdd?(<i className="fa fa-edit add-btn" onClick={addItem}></i> ):(
                  <i className="fa fa-plus add-btn" onClick={addItem}></i> 
                )}
                 
            </div>
            <div className="showItems">
              {/* added items list */}
              {items.map((curEl)=>{
                  return(
                    <div className="eachItem" key={curEl.id}>
                     <h3>{curEl.name}</h3>
                     <div className="todo-btn">
                       <i className="far fa-edit add-btn" onClick={()=>editItem(curEl.id)}></i>
                       <i className="far fa-trash-alt add-btn" onClick={()=>deleteItem(curEl.id)}></i>
                      </div>
                    </div>
                  );
              })}
              
              {/* button area */}
              <button 
              className='btn effect04'
               data-sm-link-text="REMOVE ALL" onClick={deleteAll}><span>CHECK LIST</span> </button>

            </div>
        </div>
    </div>
    </>
  );
};

export default Todo