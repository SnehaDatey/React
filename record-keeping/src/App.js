import './App.css';
import TopHeader from './Components/TopHeader';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import Fields from './Components/Fields';
import DeleteIcon from '@mui/icons-material/Delete';

function App() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState([]);

  const addData = () => {
    setData([...data,{name,email}]);
    setName("");
    setEmail("");
  }

  const removeItem = (index) =>{
    let arr = data;
    arr.splice(index,1);
    setData([...arr]);
  }


  return (
    <div className='container'>
      <TopHeader />
      <div className='infoBox'>
        <Stack spacing={2} direction="row">

          <TextField value={name} 
          id="name" 
          onChange={(event)=>setName(event.target.value)}
          label="Name" 
          variant="outlined" />


          <TextField value={email} 
          id="email" 
          onChange={(event)=>setEmail(event.target.value)}
          label="Email" 
          variant="outlined" />

          <Button variant="contained" onClick={addData} color="success" ><AddIcon /></Button>
        </Stack>
      </div>

        <div className='dataContainer'>
          <div className='dataWrapper'>
            <h4>Name</h4>
            <h4>Email</h4>
            <h4>Remove</h4>
          </div>
          {
            data.map((e, index) => {
              return(
                <div key={index} className='dataWrapper'>
                <h4>{e.name}</h4>
                <h4>{e.email}</h4>
                <Stack><Button variant="contained" onClick={()=> removeItem(index)} color="error" > <DeleteIcon /> </Button></Stack>
                
              </div>
              
              )
            })
          }
        </div>

    </div>
  );
}

export default App;
