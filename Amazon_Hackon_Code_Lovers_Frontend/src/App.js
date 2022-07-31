import React,{useState} from 'react';
import './App.css';
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Home from './Components/Home/Home';
import Main from './Components/Main/Main';

function App() {

  const [activeItem, setActiveItem] = useState("");

  return (

    <div className="App">
        <Home setActiveItem={setActiveItem} activeItem={activeItem}/>
        <Main setActiveItem={setActiveItem} activeItem={activeItem}/>
    </div>
  );
}

export default App;
