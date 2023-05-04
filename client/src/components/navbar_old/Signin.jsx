import React from 'react'
import "./popupmenu.css";

export default function Signin(props) {
  return props.isShow ? (
    <div className='Popupmenu-parent scale-up-center'>
      {props.children}
    </div>
  ) : ""
}
