import React from "react";
import { NavLink } from "react-router-dom";
import './header.css'

interface HeaderProps {
  fetchData: () => void
}

export const Header : React.FC<HeaderProps> = ({fetchData}) => {
  return ( 
    <header className="header">
      <h1><em><NavLink className ="link title"to='/'>nectr</NavLink></em></h1>
        <NavLink className ="link nav-link"to='/about'>about</NavLink>
        <button onClick={() => fetchData() } className ="link nav-link">new game</button>
    </header>
  )
}