import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
const Accordion = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (_jsxs("div", { className: "bg-[#341818] border border-[#683131] rounded-xl my-2", children: [_jsxs("div", { className: "p-3 flex items-center justify-between cursor-pointer", onClick: () => setIsOpen(!isOpen), children: [_jsx("p", { className: "text-white text-sm font-bold", children: title }), _jsx("span", { className: "text-[#cb9090] text-xs", children: isOpen ? "Gizle" : "Göster" })] }), isOpen && _jsx("div", { className: "px-4 pb-3", children: children })] }));
};
export default Accordion;
