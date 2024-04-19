import React from "react";
import "./error-message.css";
interface ErrorProps {
  message: String;
}

export const ErrorMessage: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div className="error-card">
      <p>{message}</p>
    </div>
  );
};
