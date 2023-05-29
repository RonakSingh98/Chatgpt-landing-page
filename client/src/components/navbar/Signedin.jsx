import React from 'react'
import './signedin.css';

export default function Signedin({logout}) {
  return (
    <div className='logout'>
        <p>Hi, {localStorage.getItem("name")}</p>
        <button type='button' onClick={logout} style={{marginRight: "2vw"}}>Logout</button>
    </div>
  )
}
