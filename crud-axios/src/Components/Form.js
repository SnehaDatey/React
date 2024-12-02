import { postData, updateData } from '../API/PostApi'
import React, { useEffect, useState } from 'react'

const Form = ({data, setData, updateDataApi, setUpdateDataApi}) => {
const [addData, setAddData] = useState({
    title: "",
    body:""
})


let isEmpty = Object.keys(updateDataApi).length === 0;

//get the updated Data and add into  input field

useEffect(()=>{
    updateDataApi && setAddData({
        title : updateDataApi.title || "",
        body : updateDataApi.body || "", 
    })
},[updateDataApi])



const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAddData((prev)=>{
        return{...prev,[name]:value,}
    });
}


const addPostData = async() => {
    const res = await postData(addData);
    if((res.status===201)){
        setData([res.data, ...data]) // Add the data in API 
        setAddData({ title:"",body:""}) // Blank the fileds title and body after adding data
    }
}


const updatePostData = async() => {
    try{
        const res = await updateData(updateDataApi.id, addData);

        if(res.status === 200)
            {
                setData((prev)=>{
                return prev.map((curElem)=>{
                return curElem.id === res.data.id ? res.data : curElem;
                 });
             });

                setAddData({title:"", body:""});
                setUpdateDataApi({}); // reset Add button after update
             }
    }catch(error){
        console.log(error)
    }

}

//Form submission

const handleFormSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value; // it will reset the current value of button from update to add
    addPostData();
    if(action === "Add"){
        addPostData();
    }
    else if(action === "Edit"){
        updatePostData();
    }
}
  return (
    <form onSubmit={handleFormSubmit}>
        <div>
            <label htmlFor="title"></label>
            <input type='text'
            name='title'
            placeholder='Add Title'
            value={addData.title}
            onChange={handleInputChange}
            />
        </div>

        <div>
            <label htmlFor="body"></label>
            <input type='text'
            name='body'
            value={addData.body}
            onChange={handleInputChange}
            placeholder='Add Description'
            />
        </div>

        <button type='submit' value={isEmpty ? "Add" : "Edit"}> 
            {isEmpty ? "Add" : "Edit"} 
        </button>

    </form>
  )
}

export default Form