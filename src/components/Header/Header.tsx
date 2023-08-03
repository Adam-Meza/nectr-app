import React from "react";
import { NavLink } from "react-router-dom";
import './header.css'
import { useHistory } from 'react-router-dom';

interface HeaderProps {
  fetchData: () => void
}

export const Header : React.FC<HeaderProps> = ({fetchData}) => {
  const history = useHistory();

  const handleClick = () => {
    fetchData()
    history.push('/')
  }
  
  return ( 
    <header className="header">
      <h1><em><NavLink className =" title"to='/'>nectr</NavLink></em></h1>
      <div className="link-container">
        <NavLink className ="about" to='/about'>ABOUT</NavLink>
        <button onClick={() => handleClick() } className ="new-game">NEW GAME</button>
      </div>
    </header>
  )
}