import React from "react";
import { NavLink } from "react-router-dom";
import "./header.css";
import { useHistory } from "react-router-dom";

interface HeaderProps {
  startNewGame: () => void;
}

export const Header: React.FC<HeaderProps> = ({ startNewGame }) => {
  const history = useHistory();
  const windowWidth = window.innerWidth;

  const handleClick = () => {
    startNewGame();
    history.push("/");
  };

  return (
    <header className="header">
      <h1>
        <em>
          <NavLink className=" title" to="/">
            nectr
          </NavLink>
        </em>
      </h1>
      <div className="link-container">
        {windowWidth > 700 ? (
          <NavLink className="about" to="/about">
            ABOUT
          </NavLink>
        ) : null}
        <button onClick={() => handleClick()} className="new-game">
          NEW GAME
        </button>
      </div>
    </header>
  );
};
