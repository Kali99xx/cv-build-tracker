import { useState, useRef } from "react";

const Todos = ({setParams}) => {
    const [todos, setTodos] = useState([{ text: '', isChecked: false }]);
    const lastInputRef = useRef(null);
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (lastInputRef.current) {
                lastInputRef.current.focus();
            }
        }
    };

    const handleCheckboxChange = (index) => {
        const newTodos = [...todos];
        newTodos[index].isChecked = !newTodos[index].isChecked;
        setTodos(newTodos);
    };

    const handleTextChange = (index, value) => {
        const newTodos = [...todos];
        if (index === todos.length - 1 && newTodos[index].text === '') {
            newTodos.push({ text: '', isChecked: false });
        }
        newTodos[index].text = value;
        setTodos(newTodos);
        setParams((pre) => ({
            ...pre,
            step: todos.slice(0, -1)
        }))
    };

    const handleDelete = (index) => {
        if (todos.length > 1) setTodos(todos.filter((_, i) => i !== index));
    };

    return (
        <div>
            {todos.map((todo, index) => (
                <div key={index} className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={todo.isChecked}
                            onChange={() => handleCheckboxChange(index)}
                            className="form-checkbox h-6 w-6 transition duration-150 ease-in-out"
                        />
                        <input
                            type="text"
                            value={todo.text}
                            onChange={(e) => handleTextChange(index, e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type scheduled meeting"
                            ref={index === todos.length - 1 ? lastInputRef : null}
                            className="bg-transparent w-[200px] text-gray-900 placeholder-gray-500 text-[15px] focus:outline-none focus:ring-0 px-4 py-2"
                        />
                    </div>
                    {index !== todos.length -1 &&
                    <div
                        className="w-8 h-8 rounded-md bg-red-50 flex items-center justify-center text-red-800 cursor-pointer"
                        onClick={() => handleDelete(index)} // Correctly passing the index here
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 17" className="w-5">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.38 7.258s-.361 4.49-.571 6.382c-.1.903-.658 1.432-1.572 1.449-1.74.031-3.481.033-5.22-.003-.88-.018-1.428-.554-1.526-1.442-.211-1.908-.571-6.386-.571-6.386M14.302 5.106H2.997M12.124 5.106c-.523 0-.974-.37-1.076-.883l-.162-.81a.853.853 0 00-.825-.633H7.24a.853.853 0 00-.825.632l-.162.811a1.099 1.099 0 01-1.076.883"></path>
                        </svg>
                    </div>}
                </div>
            ))}
        </div>
    );
};

export default Todos;
