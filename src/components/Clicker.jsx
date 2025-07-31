import React, { useEffect } from 'react'
import { useState } from 'react'
import Cursor from './Cursor'
const Clicker = () => {
    
  const [count, setcount] = useState(10)

  const increment = () => setcount(count+1)
  const decrement = () => setcount(count-1)


  useEffect(()=>{
    const savedcount =parseInt(localStorage.getItem('count')?? 0)
    setcount(savedcount)
  },[])

  useEffect(() => {
    localStorage.setItem('count',count)
  }, [count])
  

  return (
    <div className='flex flex-col justify-start items-start h-screen w-screen bg-transparent absolute z-10'>
        <h2>{count}</h2>
        <div className='flex gap-2'>
            <button onClick={increment} className='border-2 w-fit px-1'>increment</button>
            <button onClick={decrement} className='border-2 w-fit px-1'>decrement</button>
        </div>
    </div>
  )
}

export default Clicker