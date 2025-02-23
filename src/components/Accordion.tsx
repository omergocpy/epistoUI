import React, { useState } from 'react';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#341818] border border-[#683131] rounded-xl my-2">
      <div
        className="p-3 flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-white text-sm font-bold">{title}</p>
        <span className="text-[#cb9090] text-xs">{isOpen ? "Gizle" : "Göster"}</span>
      </div>
      {isOpen && <div className="px-4 pb-3">{children}</div>}
    </div>
  );
};

export default Accordion;
