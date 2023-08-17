import React from "react";
import './Loading.css'

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = "Loading..." }) => {
  return (
    <div className="loading">
      <div className="spinner"></div>
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default Loading;



