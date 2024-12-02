import { getPost, deletePost } from '../API/PostApi';
import { useEffect, useState } from 'react';
import '../App.css'
import Form from './Form';


const Posts = () => {

const  [data, setData] = useState([]);
const [updateDataApi, setUpdateDataApi] = useState({}); // title and body is an object

const getPostData = async() => {
  const res = await getPost();
  console.log(res);
  setData(res.data);
}

useEffect(()=>{
  getPostData();
},[]);

// Delete Method
const handleDeletePost = async(id) => {
  try{
    const res = await deletePost(id);
    if(res.status === 200){
        const newUpdatedPosts = data.filter((curPost) => {
            return curPost.id !== id;
        });
        setData(newUpdatedPosts);
    
  }else{
    console.log("Failed to delete post : ", res.status);
  }
}catch(error){
console.log(error);
}
   
}

// Update Post Method

const handleUpdatePost = (curElem) => {
    setUpdateDataApi(curElem);
}

return ( 

<>

<section className='section-form'>
    <Form  data={data} setData={setData} updateDataApi={updateDataApi} setUpdateDataApi={setUpdateDataApi} />
</section>


<section className='section-post'>
    <ol>
        {
            data.map((curElem)=>{
                const {id, title, body} = curElem;
                return(
                    <li key={id}>
                        <p>Title : {title}</p>
                        <p>Desc : {body}</p>
                        <button onClick={()=> handleUpdatePost(curElem)}>Edit</button>
                        <button className='btn-delete' onClick={()=>handleDeletePost(id)}>Delete</button>
                    </li>
                )
            })
        }
    </ol>
</section>
</>

    )
};

export default Posts;

