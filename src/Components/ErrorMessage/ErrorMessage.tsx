import React from "react";
import './ErrorMessage.css'
interface ErrorProps {
  message: String
}

export const ErrorMessage : React.FC<ErrorProps> = ({message}) => {
  return (
    <div className="error-card">
      <p>{message}</p>
    </div>
  )
}