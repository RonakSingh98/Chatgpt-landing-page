import React, { useState } from 'react';
import {RiMenu3Line,RiCloseLine} from 'react-icons/ri';
import logo from '../../assets/logo.svg';
import './navbar.css';
import Signin from './Signin';
const Navbar = () => {
  const [toggleMenu ,setToggleMenu] = useState(false);
  const [isShow,setIsShow] = useState(false);
  const [isShow2,setIsShow2] = useState(false);

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
          <p><a href="https://openai.com/">Open AI</a></p>
          <p><a href="#features">Case Studies</a></p>
          <p><a href="#blog">Library</a></p>
        </div>
      </div>
          <div className="gpt3__navbar-sign">
            <p onClick={revIsShow2}>Sign in</p>
            <Signin isShow={isShow2}>
            <form>
            <h3>Email</h3>
            <input type="email" name="email"></input><br/>
            <h3>Password</h3>
            <input type="password" name="password"></input><br/>
            <input type="submit" value={"submit"}></input>
            </form>
            </Signin>
            

            <button type="button" onClick={revIsShow}>Sign up</button>
            <Signin isShow={isShow}>
            <form>
            <h3>first Name</h3>
            <input type="text" name="fname"></input>
            <h3>last Name</h3>
            <input type="text" name="lname"></input>
            <h3>email</h3>
            <input type="email" name="email"></input><br/>
            <h3>password</h3>
            <input type="password" name="password"></input><br/>
            <input type="submit" value={"submit"}></input>
          </form>
            </Signin>

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
                            <p>Sign in</p>
                            <button type="button">Sign up</button>
                      </div>
                  </div>
                     )}
            </div>      
      </div>
  );
};

export default Navbar;