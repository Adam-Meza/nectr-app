import React from "react";
import './About.css'

export const About : React.FC = () => {
  return (
    <div className='about'>
      <p> Nectr was designed and created by Adam Meza.</p>
      <a href="https://github.com/adam-meza" className="nav-link">GitHub</a>
      <a href="https://www.linkedin.com/in/adam-meza/" className="nav-link" >LinkedIn</a>
    </div>
  )
}