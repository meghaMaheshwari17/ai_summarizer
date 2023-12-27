import {useState,useEffect} from 'react'
import Hero from './components/Hero'
import Demo from './components/Demo'
import { Alert } from "@material-tailwind/react";
import './App.css'
const App = () => {
  const [openAlert, setOpenAlert] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setOpenAlert(false);
    }, 3000);
  }, [openAlert]);  
  return (
    <main>
      <div className="main">
        <div className="gradient">
        </div>
      </div>
      <div className='app'>
        {openAlert && 
      <Alert color="green" 
      open={openAlert} 
      style={{ width: '20%', position: 'fixed', top: '1rem', right: '10rem' }}
      onClose={()=>setOpenAlert(false)}
      animate={{mount:{x:100,y:10},unmount:{y:100}}}
      >
        Copied to clipboard
      </Alert>
       }
        <Hero/>
        <Demo onChange={()=>setOpenAlert(true)}/>
      </div>
    </main>
  )
}

export default App