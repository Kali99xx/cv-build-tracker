import React, { useState, useRef, useEffect } from 'react';

const Combobox = ({items, item, width, setParams, initialValue="Init"}) => {
  const [selectedOption, setSelectedOption] = useState(items[0]);
  const [isOpen, setIsOpen] = useState(false);
  const comboboxRef = useRef(null); 

  const handleSelect = (option) => {

    setSelectedOption(option);
    setIsOpen(false);
    setParams((prevContent) => {
      if (item === 'contact') {
        return {
          ...prevContent,
          contact: {
            ...prevContent.contact,
            method: option 
          }
        };
      } else {
        return {
          ...prevContent,
          [item]: option 
        };
      }
    });
  };

  useEffect(() => {

    const handleClickOutside = (event) => {
      if (comboboxRef.current && !comboboxRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if(initialValue != "Init")
      handleSelect(initialValue);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={comboboxRef} className={`relative ${width}`}>
      <input
        type="text"
        value={selectedOption}
        readOnly
        onClick={() => setIsOpen(!isOpen)}
        placeholder="Select an option"
        className="w-full px-4 py-1 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
      />

      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-70 overflow-auto">
          {items.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Combobox;
