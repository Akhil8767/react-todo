import React,{useEffect, useState} from "react";
import "./ToDo.css";

const dataRetrive=()=>{
  let List=localStorage.getItem("List")
  if(List){
    return JSON.parse(List)
    // return JSON.parse("list")
  }
  else{
    return []
  }
}
export const ToDo = () => {
  const [input,setInput]=useState('')
  const [item,setItem]=useState(dataRetrive())
  const [edit,setEdit]=useState("")
  const [toggleUpdate,setToggleUpdate]=useState(false)
  const addItem=()=>{
    if(!input){
      alert("Enter your List")
    }else if(input && toggleUpdate){
         setItem(
           item.map((curElem)=>{
              if (  curElem.id === edit){
                return {...curElem,name:input}
              }
              return  curElem
           })
         )
         setInput("")
         setEdit("")
         setToggleUpdate(false)
    }
    else{
      const newInput={
        name:input,
        id:new Date().getTime().toString()
      }
      setItem([...item,newInput])
      setInput('')
    }
  }
  // edit Section

  const editItem=(index)=>{
    const editData=item.find((curElem)=>{
      return curElem.id === index
    })
      setInput(editData.name)
      setEdit(index)
      setToggleUpdate(true)
  }

  // delet section
  const deleteItem=(index)=>{
      const removeItem=item.filter((curElem)=>{
        return curElem.id !==index
      })
      setItem(removeItem)
  }
  // remove All 
  const removeAll=()=>{
    return setItem([])
  }

  useEffect(()=>{
    localStorage.setItem("List",JSON.stringify(item))
  },[item])
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./img/todo.svg" alt="todo" />
            <figcaption>Add your List here ✌</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              className="from-control"
              placeholder="✍ add your item"
              value={input}
              onChange={(e)=>setInput(e.target.value)}
            />
            {
              toggleUpdate ? 
              <i className="far fa-edit add-btn" onClick={addItem}></i>
              :
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            }
            
          </div>
          {/* Show addItems */}
          <div className="showItems">
            {item.map((Constant,index)=>{
              return(
                <div className="eachItem" key={index} >
                <h3>{Constant.name}</h3>
                <div className="todo-btn">
                <i className="far fa-edit add-btn" onClick={()=>editItem(Constant.id)}></i>
                <i className="far fa-trash-alt add-btn" onClick={()=>deleteItem(Constant.id)}></i>
                </div>
            </div>
              )
            })}
              
          </div>


          {/* remove all button */}
          <div className="showItems">
              <button className="btn effect04" data-sm-link-text="revome All" onClick={removeAll}>
                  <span>Check List</span></button>
          </div>
        </div>
      </div>
    </>
  );
};
