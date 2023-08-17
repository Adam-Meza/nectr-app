import React, { useState } from 'react';
import './Dropdown.css'
import { motion } from 'framer-motion';

interface DropdownProps {
  answers: any[];
}

const Dropdown: React.FC<DropdownProps> = ({ answers }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = (answer: string) => {
    setSelectedAnswer(answer);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      Your answers...
      <motion.button 
        className="dropdown-button"
        onClick={toggleDropdown}
      >
        ⌄
      </motion.button>
      {isOpen && (
        <div className="dropdown-content">
          {answers.map((answer, index) => (
            <div key={index} className="dropdown-answer">
              {answer.word}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
