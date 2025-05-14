import { useState, useRef } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useClickOutside from "../utils/useClickOutside";
import { handleStep } from "../actions/trackAction";

const StatusStep = ({name}) => {
    const [preStep, setPreStep] = useState("")
    const [type, setType] = useState("ADD_Step")
    const dispatch = useDispatch()
    const [isClickedStep, setIsClickedStep] = useState(false)
    const StepRef = useRef(null); 
    useClickOutside(StepRef, () => {setIsClickedStep(false); setIsEditStep(false)});
    const [isEditStep, setIsEditStep] = useState(false)
    const handleEditStep = () => {
        setIsEditStep(true)
        setPreStep(name)
        setType("UPDATE_TITLE")
    }

    const handleDeleteStep = () => {
        dispatch(handleStep("DELETE_TITLE", "", name))
    }

    return (
        <div className="w-full">
            {isEditStep?<div ref={StepRef}><EditStep type={type} setIsAddStep={setIsEditStep} pre_Step={preStep} /></div>:
            <div className="relative flex flex-row items-center justify-between  mt-[10px] w-full px-2">
                <div className="flex h-[30px] w-[30px] items-center justify-center rounded-xl bg-[#fdf7ea] text-[13px] font-bold text-[#eda712]">5</div>
                <div className="font-semibold text-[20px]">{name}</div>
                {isClickedStep?
                <div ref={StepRef} className="w-[30px] h-[30px] bg-white rounded-full flex justify-center items-center cursor-pointer" onClick={() => setIsClickedStep(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 13 12" className="w-[1em]"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.565 1.22l-9.992 9.54M11.567 10.766l-10-9.55"></path></svg>
                    <ul className="absolute right-0 top-[120%] z-10 grid w-full max-w-[160px] grid-cols-1 rounded-xl bg-white shadow-[0px_0px_16px_3px_rgba(0,0,0,0.15)]">
                        <li className="flex cursor-pointer items-center justify-between p-2" onClick={handleEditStep}>
                            <p className="text-primaryBlack">Rename</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" className="w-[1.4em]"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6.704 1.627H4.523c-1.794 0-2.919 1.27-2.919 3.068v4.85c0 1.797 1.12 3.067 2.919 3.067H9.67c1.8 0 2.92-1.27 2.92-3.068v-2.35"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5.15 6.37l4.36-4.359a1.391 1.391 0 011.966 0l.71.71a1.39 1.39 0 010 1.967l-4.38 4.38c-.238.237-.56.37-.896.37H4.725l.054-2.204c.009-.324.141-.634.37-.864z" clip-rule="evenodd"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.847 2.685l2.663 2.663"></path></svg>
                        </li>
                        <li className="flex cursor-pointer items-center justify-between px-2 pb-2" onClick={handleDeleteStep}>
                            <p className="text-primaryBlack">Delete List</p><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 17" className="w-[1.4em]"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.38 7.258s-.361 4.49-.571 6.382c-.1.903-.658 1.432-1.572 1.449-1.74.031-3.481.033-5.22-.003-.88-.018-1.428-.554-1.526-1.442-.211-1.908-.571-6.386-.571-6.386M14.302 5.106H2.997M12.124 5.106c-.523 0-.974-.37-1.076-.883l-.162-.81a.853.853 0 00-.825-.633H7.24a.853.853 0 00-.825.632l-.162.811a1.099 1.099 0 01-1.076.883"></path></svg>
                        </li>
                    </ul>
                </div>:
                <div className="cur``sor-pointer w-[30px] h-[30px] flex justify-center items-center" onClick={() => setIsClickedStep(true)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-[1.4em]"><path fill="currentColor" d="M19.482 10c1.104 0 2 .897 2 2 0 1.101-.896 2-2 2s-2.001-.899-2.001-2c0-1.103.897-2 2-2zM12 10c1.104 0 2.001.897 2.001 2 0 1.101-.897 2-2 2-1.105 0-2.002-.899-2.002-2 0-1.103.897-2 2.001-2zM4.52 10c1.104 0 2 .897 2 2 0 1.101-.896 2-2 2s-2.001-.899-2.001-2c0-1.103.897-2 2-2z"></path></svg></div>}
            </div>}
        </div>
    )
}

const EditStep = ({type, pre_Step, setIsAddStep}) => {
    // console.log(type, pre_Step, setIsAddStep);
    // console.log(type);
    const dispatch = useDispatch()
    const [Step, setStep] = useState(pre_Step || "");
    const Steps = useSelector(state => state.track?.Steps || []);
    const handleEditStep = () => {
        if (Steps.includes(Step) && Step !== pre_Step) {
            toast.error("This Step already exists!")
        }
        if (Step === "") {
            toast.error("Please type correct name.")
        }
        else {
            dispatch(handleStep(type, pre_Step, Step)); 
            setIsAddStep(false);
        }
    }

    return (
        <div className="flex flex-row justify-between h-[40px] w-full">
            <div className="h-full w-[200px]">
                <input
                    type="text"
                    placeholder="Enter column Step"
                    value={Step}
                    onChange={(e) => setStep(e.target.value)}
                    className="h-full w-full bg-transparen px-2 py-2 text-gray-900 placeholder-gray-500 text-[17px] border-[1px] border-black focus:outline-none focus:ring-0 rounded-lg"
                    autoFocus
                />
            </div>
            <div className="w-[40px] h-[40px] bg-red-500 rounded-lg flex items-center justify-center text-white text-[20px] cursor-pointer" style={{
                background: 'linear-gradient(to right, rgb(236, 0, 140), rgb(252, 103, 103))'
            }} onClick={handleEditStep}> 
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[1.4em]"><path d="M0 0h24v24H0z" fill="none"></path><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg>
            </div>
        </div>
    )
}

export  { StatusStep, EditStep };