import React from "react";
import { NavLink } from "react-router-dom";
import './Header.css'

export const Header = () => {
  return ( 
    <header className="header">
      <h1><em><NavLink className ="link title"to='/'>nectr</NavLink></em></h1>
      <div className="link-container">
        <NavLink className ="link nav-link"to='/favorites'>FAVORITES</NavLink>
        <NavLink className ="link nav-link"to='/stats'>STATS</NavLink>
      </div>
    </header>
  )
}