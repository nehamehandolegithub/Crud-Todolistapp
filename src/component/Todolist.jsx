import React, { useEffect, useState } from 'react';
import todoimgnotes from "../images/todonotes.jpg";

const getLocalData = () =>{
  const lists = localStorage.getItem("mytodolist");

  if(lists){
    return JSON.parse(lists);
  }else{
    return [];
  }
}

const Todolist = () => {

  const [data, setData] = useState(' ');
  const [item, setItem] = useState(getLocalData());
  const [togglesubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  const inputEvent = (event) => {
    setData(event.target.value)
  }

  const addItem = () => {
    if (!data) {
      alert("plzz fill the data..");

    } else if (data && !togglesubmit) {
      setItem(
        item.map((element) => {
          if (element.id === isEditItem) {
            return { ...element, name: data }
          }
          return element;
        })
      )
      setToggleSubmit(true);
      setData('');

      setIsEditItem(null);

    } else {
      const allInputData = { id: new Date().getTime().toString(), name: data }
      setItem([...item, allInputData]);
      setData('');
    }

  }

  const deleteItem = (index) => {
    const updateditems = item.filter((element) => {
      return index !== element.id;

    });
    setItem(updateditems);

  }

  const editItem = (id) => {
    let newEditItem = item.find((element) => {
      return element.id === id
    });
    setToggleSubmit(false);
    setData(newEditItem.name);

    setIsEditItem(id);

  }

  const DeleteAll = () => {
    setItem([]);
  }

  // Adding detail in local storage

  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(item));
  }, [item]);

  return (
    <>
      <div className='bg-blue-950 w-full h-[100vh] flex justify-center'>
        <div className='flex flex-col items-center'>
          <img src={todoimgnotes} alt="todolistimg" className='w-20 h-24 mt-24' />
          <p className='text-[20px] text-white my-4'>Add Your List Here ✌️</p>
          <div className='my-4'>
            <input type="text" placeholder='✍️ Add item....' className='w-72 py-1 pl-4 rounded-s-md outline-0 border-0' onChange={inputEvent} value={data} />
            {
              togglesubmit ? <i className="fa fa-plus bg-white text-gray-500 py-2 pr-4 rounded-e-md cursor-pointer hover:text-green-500 " title='Add Item' onClick={addItem} aria-hidden="true"></i> : <i className="fa fa-edit bg-white text-gray-500 py-2 pr-4 rounded-e-md cursor-pointer hover:text-green-500 " title='Edit Item' onClick={addItem} aria-hidden="true"></i>
            }

          </div>

          <div>
            {
              item.map((element) => {
                return (
                  <div key={element.id} className='flex my-4 text-white bg-purple-600 justify-between items-center w-[318px] py-1 rounded-md px-4 hover:text-purple-600 hover:bg-white'>
                    <h2>{element.name}</h2>
                    <div className='flex items-center justify-center'>
                      <i className="fa fa-edit cursor-pointer hover:text-green-600 pr-3 pt-1" title='Edit Item' onClick={() => editItem(element.id)}></i>
                      <i className="fa fa-trash-o cursor-pointer hover:text-red-600" title='Delete Item' onClick={() => deleteItem(element.id)}></i>
                    </div>

                  </div>
                )
              })
            }
          </div>

          <button className="bg-white hover:bg-red-500 text-gray-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded " onClick={DeleteAll}>Delete All</button>
        </div>
      </div>
    </>
  )
}

export default Todolist;
