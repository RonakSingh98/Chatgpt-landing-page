import React, { useEffect, useState } from 'react';
import {RiMenu3Line,RiCloseLine} from 'react-icons/ri';
import logo from '../../assets/logo.svg';
import './navbar.css';
import Signin from './Signin';
import Signedin from './Signedin';
const Navbar = () => {
  const host = process.env.HOST;
  const [toggleMenu ,setToggleMenu] = useState(false);
  const [isShow,setIsShow] = useState(false);
  const [isShow2,setIsShow2] = useState(false);
  const [form,setForm] = useState({});
  const [isSigned,setIsSigned] = useState({
    status : false
  });
  const strongpass = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/

  const capitalize = (name)=>{
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  const clearForm = ()=>{
    setForm({});
  }
  const formHandler = (ent)=>{
    const value = ent.target.value;
    setForm({
      ...form,
      [ent.target.name] : value
    })
    let element = document.getElementById(ent.target.id);
    if(ent.target.name==="password" && !(element.id==("password1") || element.id==("password3"))){
      const validatepass = strongpass.test(value);
      if(!validatepass){
        element.style.border = "2px solid red";
      }
      else{
        element.style.border = "2px solid green";
      }
    }
  }

const formSubmit = async (e)=>{
  e.preventDefault();
  if(strongpass.test(form.password)){
    let response = await fetch(`${host}/register`,{
      method : "POST",
      body : JSON.stringify(form),
      headers : {
        "Content-Type" : "application/json"
      }
    })
    let jsonobj = await response.json();
    clearForm();
    return true;
  }
  else{
    return false;
  }
}

const formLogin = async (e)=>{
  e.preventDefault();
  let response = await fetch(`${host}/login`,{
    method : "POST",
    body : JSON.stringify(form),
    headers : {
      "Content-Type" : "application/json"
    }
  })
  let jsonobj = await response.json();
  if(jsonobj.loginstatus){
    setIsSigned({
      status : true
    })
    localStorage.setItem("token",jsonobj.token);
    localStorage.setItem("name",capitalize(jsonobj.fname));
  }
  clearForm();
}

  const revIsShow = ()=>{
    setIsShow2(false);
    setIsShow(!isShow);
  }

  const revIsShow2 = ()=>{
    setIsShow(false);
    setIsShow2(!isShow2);
  }

  const logout = ()=>{
    setIsSigned({
      status : false
    });
    localStorage.removeItem("token");
    localStorage.removeItem("name");
  }

  const checkAuth = async ()=>{
    let response = await fetch(`${host}/auth`,{
      method : "POST",
      headers : {
        "user-token" : localStorage.getItem("token")
      }
    });
    const resdata = await response.json();
    if(resdata.loginstatus){
      localStorage.setItem("name",capitalize(resdata.name));
      setIsSigned({
        status : true
      })
    }
    else{
      localStorage.removeItem("name");
      localStorage.removeItem("token");
    }
  }

  useEffect(()=>{
    if(localStorage.getItem("token")){
      checkAuth();
    }
    else{
      logout();
    }
  },[])

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
            {isSigned.status ? <Signedin logout = {logout}/>: <><p onClick={()=>{return revIsShow2()}}>Sign in</p>
            <Signin isShow={isShow2}>
            <form onSubmit={(e)=>{setIsShow2(false);return formLogin(e)}}>
            <input  className='Cross' type='submit' value={"X"} onClick={()=>setIsShow2(false)}></input>
            <h3>Email</h3>
            <input type="email" name="email" onChange={formHandler} placeholder='Enter Email'></input><br/>
            <h3>Password</h3>
            <input type="password" name="password" id="password1" onChange={formHandler} placeholder='******'></input><br/><br/>
            <input className='btn' type="submit" value={"submit"}></input>
            </form>
            </Signin>
            

            <button type="button" onClick={()=>{return revIsShow();}}>Sign up</button>
            <Signin isShow={isShow}>
            <form onSubmit={async (e)=>{return setIsShow(!(await formSubmit(e)))}}>
            <input  className='Cross' type='submit' value={"X"} onClick={()=>setIsShow(false)}></input>
            <h3>First Name</h3>
            <input type="text" name="fname" onChange={formHandler} placeholder='Enter First Name'></input>
            <h3>Last Name</h3>
            <input type="text" name="lname" onChange={formHandler} placeholder='Enter last Name'></input>
            <h3>Email</h3>
            <input type="email" name="email" onChange={formHandler} placeholder='Enter Email'></input><br/>
            <h3>Password</h3>
            <input type="password" name="password" id="password2" onChange={formHandler} placeholder='******'></input><br/><br/>
            <input className='btn' type="submit" value={"submit"}></input>
          </form>
            </Signin></>}

          </div>  
          <div className='greet_mobile'>
          {isSigned.status ? <p>Hi, {localStorage.getItem("name")}</p> : ""}
          </div>
            <div className="gpt3__navbar-menu">
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
                      { isSigned.status ? <><button type="button" onClick={logout}>Logout</button> </> :
                        <>
                      <p onClick={()=>{return revIsShow2()}}>Sign in</p>
                         <Signin isShow={isShow2}>
                         <form className='form2' onSubmit={(e)=>{setToggleMenu(false);setIsShow2(false);return formLogin(e)}}>
                         <input  className='Cross' type='submit' value={"X"} onClick={()=>setIsShow2(false)}></input>
                         <h3>Email</h3>
                         <input type="email" name="email" onChange={formHandler} placeholder='Enter Email'></input><br/>
                         <h3>Password</h3>
                         <input type="password" name="password" id="password3" onChange={formHandler} placeholder='******'></input><br/><br/>
                         <input className='btn' type="submit" value={"submit"}></input>
                         </form>
                         </Signin>
            

                          <button type="button" onClick={()=>{return revIsShow()}}>Sign up</button>
                          <Signin isShow={isShow}>
                          <form className='form2' onSubmit={async (e)=>{return await formSubmit(e) ? (setToggleMenu(false),setIsShow(false)) : ""}}>
                          <input  className='Cross' type='submit' value={"X"} onClick={()=>setIsShow(false)}></input>
                          <h3>First Name</h3>
                          <input type="text" name="fname" onChange={formHandler} placeholder='Enter First Name'></input>
                          <h3>Last Name</h3>
                          <input type="text" name="lname" onChange={formHandler} placeholder='Enter last Name'></input>
                          <h3>Email</h3>
                          <input type="email" name="email" onChange={formHandler} placeholder='Enter Email'></input><br/>
                          <h3>Password</h3>
                          <input type="password" name="password" id="password4" onChange={formHandler} placeholder='******'></input><br/><br/>
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