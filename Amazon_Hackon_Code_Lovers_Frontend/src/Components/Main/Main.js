import React ,{useRef} from "react";
import "./Main.css";
import ConfirmOrder from "../ConfirmOrder/ConfirmOrder";
import Uploadimage from "../Upload/Upload";
import Claim from "../Claim/Claim";

const Main = ({activeItem,setActiveItem}) => {
    return(
        <div className="main">
            {activeItem==="confirmorder" && <ConfirmOrder setActiveItem={setActiveItem}/>}
            {activeItem==="uploadimage" && <Uploadimage setActiveItem={setActiveItem}/>}
            {activeItem==="claim" && <Claim setActiveItem={setActiveItem}/>}
        </div>
    );
}

export default Main;