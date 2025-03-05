
// src/components/Accordion.tsx
import React, { useState } from 'react';
import '../styles/MetaverseStyles.css';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="glass rounded-2xl overflow-hidden mb-4">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light">
            {isOpen ? (
              <path d="M19 9l-7 7-7-7" />
            ) : (
              <path d="M9 5l7 7-7 7" />
            )}
          </svg>
          <h4 className="text-white text-lg font-orbitron font-medium">{title}</h4>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-gray-400 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
      <div className={`px-6 pb-6 transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}>
        {children}
      </div>
    </div>
  );
};

export default Accordion;
