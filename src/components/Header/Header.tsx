import React from "react";
import { NavLink } from "react-router-dom";
import './header.css'

interface HeaderProps {
  fetchData: () => void
}

export const Header : React.FC<HeaderProps> = ({fetchData}) => {
  return ( 
    <header className="header">
      <h1><em><NavLink className =" title"to='/'>nectr</NavLink></em></h1>
      <div className="link-container">
        <NavLink className ="about"to='/about'>about</NavLink>
        <button onClick={() => fetchData() } className ="new-game">new game</button>
      </div>
    </header>
  )
}