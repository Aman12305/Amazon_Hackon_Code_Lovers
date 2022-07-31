import React from 'react'
import Navbar from '../NavBar/NavBar';

const Home = ({activeItem,setActiveItem}) => {

    return (
        <div>
            <Navbar activeItem={activeItem} setActiveItem={setActiveItem}/>
        </div>
    )
}

export default Home;

