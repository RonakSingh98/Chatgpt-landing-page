import React from 'react'
import './signedin.css';

export default function Signedin({isSigned,setIsSigned}) {
  return (
    <div className='logout'>
        <p>Hi, {isSigned.name}</p>
        <button type='button' onClick={()=>setIsSigned(false)} style={{marginRight: "2vw"}}>Logout</button>
    </div>
  )
}
