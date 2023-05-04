import React, { useState } from 'react';
import {RiMenu3Line,RiCloseLine} from 'react-icons/ri';
import logo from '../../assets/logo.svg';
import './navbar.css';
import Signin from './Signin';
import Signedin from './Signedin';
const Navbar = () => {
  const [toggleMenu ,setToggleMenu] = useState(false);
  const [isShow,setIsShow] = useState(false);
  const [isShow2,setIsShow2] = useState(false);
  const [form,setForm] = useState({});
  const [isSigned,setIsSigned] = useState({
    status : false,
    name : ""
  });

  const clearForm = ()=>{
    setForm({});
  }
  const formHandler = (ent)=>{
    setForm({
      ...form,
      [ent.target.name] : ent.target.value
    })
  }

const formSubmit = async (e)=>{
  e.preventDefault();
  let response = await fetch("https://live-project-01-delta.vercel.app/register",{
    method : "POST",
    body : JSON.stringify(form),
    headers : {
      "Content-Type" : "application/json"
    }
  })
  let jsonobj = await response.json();
  clearForm();
  console.log(jsonobj);
}

const formLogin = async (e)=>{
  e.preventDefault();
  let response = await fetch("https://live-project-01-delta.vercel.app/login",{
    method : "POST",
    body : JSON.stringify(form),
    headers : {
      "Content-Type" : "application/json"
    }
  })
  let jsonobj = await response.json();
  if(jsonobj.loginstatus){
    setIsSigned({
      status : true,
      name : (jsonobj.fname).charAt(0).toUpperCase() + (jsonobj.fname).slice(1)
    })
  }
  clearForm();
  console.log(jsonobj);
}

  const revIsShow = ()=>{
    setIsShow2(false);
    setIsShow(!isShow);
  }

  const revIsShow2 = ()=>{
    setIsShow(false);
    setIsShow2(!isShow2);
  }

  return (
    <div className="gpt3__navbar">
      <div className="gpt3__navbar-links">
        <div className="gpt3__navbar-links_logo">
          <img src={logo}/>
        </div>
        <div className="gpt3__navbar-links_container">
          <p><a href="#home">Home</a></p>
          <p><a href="#wgpt3">What is GPT?</a></p>
          <p><a href="https://openai.com/" target='_blank'>Open AI</a></p>
          <p><a href="#features">Case Studies</a></p>
          <p><a href="#blog">Library</a></p>
        </div>
      </div>
          <div className="gpt3__navbar-sign">
            {isSigned.status ? <Signedin isSigned = {isSigned} setIsSigned = {setIsSigned}/>: <><p onClick={()=>{return revIsShow2()}}>Sign in</p>
            <Signin isShow={isShow2}>
            <form onSubmit={(e)=>{setIsShow2(false);return formLogin(e)}}>
            <input  className='Cross' type='submit' value={"X"} onClick={()=>setIsShow2(false)}></input>
            <h3>Email</h3>
            <input type="email" name="email" onChange={formHandler} placeholder='Enter Email'></input><br/>
            <h3>Password</h3>
            <input type="password" name="password" onChange={formHandler} placeholder='******'></input><br/><br/>
            <input className='btn' type="submit" value={"submit"}></input>
            </form>
            </Signin>
            

            <button type="button" onClick={()=>{return revIsShow();}}>Sign up</button>
            <Signin isShow={isShow}>
            <form onSubmit={(e)=>{setIsShow(false);return formSubmit(e)}}>
            <input  className='Cross' type='submit' value={"X"} onClick={()=>setIsShow(false)}></input>
            <h3>First Name</h3>
            <input type="text" name="fname" onChange={formHandler} placeholder='Enter First Name'></input>
            <h3>Last Name</h3>
            <input type="text" name="lname" onChange={formHandler} placeholder='Enter last Name'></input>
            <h3>Email</h3>
            <input type="email" name="email" onChange={formHandler} placeholder='Enter Email'></input><br/>
            <h3>Password</h3>
            <input type="password" name="password" onChange={formHandler} placeholder='******'></input><br/><br/>
            <input className='btn' type="submit" value={"submit"}></input>
          </form>
            </Signin></>}

          </div>  
            <div className="gpt3__navbar-menu">
              {isSigned.status ? <p style={{color: "white",margin : "0 2vw",textAlign: "center"}}>Hi, {isSigned.name}</p> : ""}
                 {toggleMenu
                 ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
                 : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)}  />}
                {toggleMenu && (
                    <div className="gpt3__navbar-menu_container scale-up-center" >
                      <div className="gpt3__navbar-menu_container-links">
                            <p><a href="#home">Home</a></p>
                            <p><a href="#wgpt3">What is GPT?</a></p>
                            <p><a href="#possibility">Open AI</a></p>
                            <p><a href="#features">Case Studies</a></p>
                            <p><a href="#blog">Library</a></p>
                      </div>
                    <div className="gpt3__navbar-menu_container-links-sign">
                      { isSigned.status ? <><button type="button" onClick={()=>setIsSigned(false)}>Logout</button> </> :
                        <>
                      <p onClick={()=>{return revIsShow2()}}>Sign in</p>
                         <Signin isShow={isShow2}>
                         <form className='form2' onSubmit={(e)=>{setToggleMenu(false);setIsShow2(false);return formLogin(e)}}>
                         <input  className='Cross' type='submit' value={"X"} onClick={()=>setIsShow2(false)}></input>
                         <h3>Email</h3>
                         <input type="email" name="email" onChange={formHandler} placeholder='Enter Email'></input><br/>
                         <h3>Password</h3>
                         <input type="password" name="password" onChange={formHandler} placeholder='******'></input><br/><br/>
                         <input className='btn' type="submit" value={"submit"}></input>
                         </form>
                         </Signin>
            

                          <button type="button" onClick={()=>{return revIsShow()}}>Sign up</button>
                          <Signin isShow={isShow}>
                          <form className='form2' onSubmit={(e)=>{setToggleMenu(false);setIsShow(false);return formSubmit(e)}}>
                          <input  className='Cross' type='submit' value={"X"} onClick={()=>setIsShow(false)}></input>
                          <h3>First Name</h3>
                          <input type="text" name="fname" onChange={formHandler} placeholder='Enter First Name'></input>
                          <h3>Last Name</h3>
                          <input type="text" name="lname" onChange={formHandler} placeholder='Enter last Name'></input>
                          <h3>Email</h3>
                          <input type="email" name="email" onChange={formHandler} placeholder='Enter Email'></input><br/>
                          <h3>Password</h3>
                          <input type="password" name="password" onChange={formHandler} placeholder='******'></input><br/><br/>
                          <input className='btn' type="submit" value={"submit"}></input>
                        </form>
                          </Signin>
                          </>}
                      </div>
                  </div>
                     )}
            </div>      
      </div>
  );
};

export default Navbar;