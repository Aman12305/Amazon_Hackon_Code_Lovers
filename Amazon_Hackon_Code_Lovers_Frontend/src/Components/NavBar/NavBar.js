import {Icon,Popup,Menu} from "semantic-ui-react";
import React ,{useRef} from "react";
import "./NavBar.css";
import { useLocation ,useNavigate} from 'react-router-dom';

export default function Navbar({activeItem,setActiveItem}) {
    const navbar = useRef(null);
    const sidebar = useRef(null);
    let i=0,f=0;
    const show = () =>{
        if(i===0)
        {
            navbar.current.style.display = "flex";
            i=1;
            f=1;
        }
        else{
            navbar.current.style.display = "none";
            i=0;
            f=0;
        }
    }

    const click = (e) => {
            setActiveItem(e.target.name);
            navbar.current.style.display = "none";

    }

  return (
      <header className="top">
          <div id="brand" className="brand">
            <img src="./img/amazon.png" alt="logo" className="brandimg"/>
          </div>
          <div className="temp">
            <nav className="navbar" id="navbar" ref={navbar}>
            <a  name="confirmorder" onClick={click} >ConfirmOrder</a>
            <a  name="uploadimage" onClick={click} >Upload Image</a>
            <a  name="claim" onClick={click} >Claim</a>
            </nav>
            <div className="sidebar" id="sidebar" ref={sidebar} onClick={show}>
                <Icon name="ellipsis vertical"/>
            </div>
          </div>
      </header>
  );
}
