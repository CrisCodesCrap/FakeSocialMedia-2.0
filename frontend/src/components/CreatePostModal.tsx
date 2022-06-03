import { useEffect, useState } from "react"
import { FaTimes } from "react-icons/fa"
import Icon from "./Icon"
import RadioButton from "./RadioButton"
import InputStageOne from "./InputStageOne"
import InputStageTwo from "./InputStageTwo"
import ContinueButton from "./ContinueButton"

interface CreatePostModalProps {
    closedCreatePostModal: boolean
    setCloseCreatePostModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreatePostModal({setCloseCreatePostModal, closedCreatePostModal}:CreatePostModalProps) {
    
    const [{height, width}, setSize] = useState({height: 0, width: 0})

    useEffect(() => {
        const resize = () => {
            setSize({height: window.innerHeight, width: window.innerWidth})
        }
        resize()
        window.addEventListener('resize', resize)
        return () => window.removeEventListener('resize', resize)
    },[])
    
    const [chosenButton, setChosenButton] = useState<string>("")
    const [droppedImages, setDroppedImages] = useState<any[]>([])
    const [inputValue, setInputValue] = useState<string>("")
    const [stageOfPost, setStageOfPost] = useState<number>(1)
    const [heading, setHeading] = useState<string>("")
    return ( 
        <>
        <div style={{width:width, height:height}} className="absolute flex items-center justify-center bg-black z-10 opacity-90"/>
        <div className="flex absolute items-center justify-center w-screen h-screen ">
            <div className=" rounded-lg inline-flex flex-col items-end justify-start w-180 h-2/3 bg-white z-10">
                <div className="flex rounded-t-lg items-center justify-between bg-blue-500 w-full h-1/8">
                    <div className="m-4 text-white font-semibold">
                        Header
                    </div>
                    <Icon useType={3} setCloseCreatePostModal={setCloseCreatePostModal} closedCreatePostModal={closedCreatePostModal}  icon={<FaTimes className='w-5 h-5'/>} tooltip={'Close the window'}/>
                </div>
                <div className="inline-flex flex-col items-center justify-start w-full h-7/8">
                    {stageOfPost===1&&
                    <>
                        <div className="text-blue-500 font-semibold ml-2 my-6">
                            You want to post a
                        </div>
                        <div className="inline-flex flex-row items-center justify-center">
                            <RadioButton name="Picture" chosenButton={chosenButton} setChosenButton={setChosenButton}/>
                            <RadioButton name="Status" chosenButton={chosenButton} setChosenButton={setChosenButton}/>
                            <RadioButton name="Thread" chosenButton={chosenButton} setChosenButton={setChosenButton}/>
                        </div>
                    </>
                    }
                    {stageOfPost===1&&<InputStageOne droppedImages={droppedImages} setDroppedImages={setDroppedImages} inputValue={inputValue} setInputValue={setInputValue} type={chosenButton}/>}
                    {stageOfPost===2&&<InputStageTwo heading={heading} setHeading={setHeading} droppedImages={droppedImages} setDroppedImages={setDroppedImages} inputValue={inputValue} setInputValue={setInputValue} type={chosenButton}/>}
                </div>
                <ContinueButton stageOfPost={stageOfPost} setStageOfPost={setStageOfPost} inputValue={inputValue} setCloseCreatePostModal={setCloseCreatePostModal} droppedImages={droppedImages}/>
            </div>
        </div>
        </>
     )
 }
