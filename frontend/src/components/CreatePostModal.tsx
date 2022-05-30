import { useState } from "react"
import { FaTimes } from "react-icons/fa"
import Icon from "./Icon"
import RadioButton from "./RadioButton"
import svg from './pic.svg'

interface CreatePostModalProps {
    closedCreatePostModal: boolean
    setCloseCreatePostModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreatePostModal({setCloseCreatePostModal, closedCreatePostModal}:CreatePostModalProps) {
    
    const [chosenButton, setChosenButton] = useState<string>("")

    return ( 
        <div className="flex absolute">
            <div className="flex items-start justify-end bg-black z-10 opacity-90 w-screen h-screen"/>
            <div className="translate-x-1/2 rounded-lg translate-y-1/4 inline-flex flex-col items-center justify-start w-1/2 h-2/3 absolute bg-white z-10">
                <div className="flex rounded-t-lg items-center justify-between bg-blue-500 w-full h-1/8">
                    <div className="m-4 text-white font-semibold">
                        Header
                    </div>
                    <Icon useType={3} setCloseCreatePostModal={setCloseCreatePostModal} closedCreatePostModal={closedCreatePostModal}  icon={<FaTimes className='w-5 h-5'/>} tooltip={'Close the window'}/>
                </div>
                <div className="text-blue-500 font-semibold ">
                        You want to post a
                    </div>
                <div className="inline-flex flex-row items-center justify-center w-full h-7/8">
                    <RadioButton name="Picture" chosenButton={chosenButton} setChosenButton={setChosenButton}/>
                    <RadioButton name="Status" chosenButton={chosenButton} setChosenButton={setChosenButton}/>
                    <RadioButton name="Code snippet" chosenButton={chosenButton} setChosenButton={setChosenButton}/>
                </div>
            </div>
        </div>
     )
 }
