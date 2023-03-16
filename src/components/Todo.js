import React,{useEffect, useState} from 'react'
import './style.css';

const getLocalData = () =>{
    const data = localStorage.getItem("mytodolist");
    if(data){
        return JSON.parse(data);
    }
    else{
        return [];
    }
}

const Todo = () => {
    const [inputData, setInputData] = useState("");
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("");
    const [tbtn, setTbtn] = useState(false);

    useEffect(() => {
      localStorage.setItem("mytodolist", JSON.stringify(items));
    }, [items])
    

    const addItem = () =>{
        if(!inputData){alert("Please fill anything!")}
        else if(inputData && tbtn){
            setItems(
                items.map((e)=>{
                    if(e.id===isEditItem){
                        return{...e,name: inputData}
                    }
                    return e;
                })
            )
            setInputData("");
            setIsEditItem(null);
            setTbtn(false);
        }
        else{
            const newData = {
                id: new Date().getTime().toString(),
                name: inputData,
            }
            setItems([...items,newData])
            setInputData("");
        }
    }

    const deleteItem = (dataId) =>{
        setItems(items.filter((e)=>{
            return e.id !== dataId
        }))
    }

    const editItem = (dataId) =>{
        const eitem = items.find((e)=>{
            return e.id === dataId;
        })
        setInputData(eitem.name);
        setIsEditItem(dataId);
        setTbtn(true);
    }

    const removeAll = () =>{
        setItems([]);
    }

  return (
    <>
        <div className="main-div">
            <div className="child-div">
                <figure>
                    <img src="./images/todo.svg" alt="todo" />
                </figure>
                <div className="addItems">
                    <input type="text" placeholder='✍ Add Item' className='form-control' value={inputData} onChange={(e)=>{setInputData(e.target.value)}} />
                    {
                        tbtn?(<i className="far fa-edit add-btn" onClick={addItem} ></i>) : (<i className="fa fa-plus add-btn" onClick={addItem} ></i>)
                    }
                </div>
                <div className="showItems">
                    {
                        items?.map((e,index)=>{
                            return(<>
                                <div className="eachItem" key={index}>
                                <h3>{e.name}</h3>
                                <div className="todo-btn">
                                    <i className="far fa-edit add-btn" onClick={()=>{editItem(e.id)}} ></i>
                                    <i className="far fa-trash-alt add-btn" onClick={()=>{deleteItem(e.id)}}></i>
                                </div>
                                </div>
                            </>)
                        })
                    }
                    
                </div>
                <div className="showItems">
                    <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll} ><span>CHECK LIST</span> </button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Todo
