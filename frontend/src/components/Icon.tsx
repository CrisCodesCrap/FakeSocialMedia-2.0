import { useState } from "react"
import Tooltip from "./Tooltip";

interface IconProps {
    showDropdown?: boolean
    setShowDropDown?: React.Dispatch<React.SetStateAction<boolean>>
    refName?: React.MutableRefObject<any>
    tooltip: string
    icon: JSX.Element
    useType: number
    showChatModal?: boolean
    onClick?:Function
    setShowChatModal?: React.Dispatch<React.SetStateAction<boolean>>     	
    closedCreatePostModal?: boolean
    setCloseCreatePostModal?: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Icon({icon, showDropdown, refName, setShowDropDown, tooltip, useType,setShowChatModal,showChatModal, closedCreatePostModal, setCloseCreatePostModal}:IconProps) {
    
    const [showToolTip, setShowToolTip] = useState(false)

    function handleHoverEvent(hoverIn:boolean){
        if(hoverIn){
            setShowToolTip(true)
            return
        }
        setShowToolTip(false)
    }

    function handleClickEventDropdown(){
        setShowDropDown !== undefined && setShowDropDown(!showDropdown)
        setShowToolTip(false)
    }

    function handleClickEventModal(){
        setShowChatModal !== undefined && setShowChatModal(!showChatModal)
        setShowToolTip(false)
    }

    function handleAddPostModal(){
        setCloseCreatePostModal !== undefined && setCloseCreatePostModal(!closedCreatePostModal)
        console.log(closedCreatePostModal)
    }

    function handleClickEvent(e:any){
        e.preventDefault()
        if(useType===1){
            return
        }    
        else if(useType===2){
            handleClickEventDropdown()
        }
        else if(useType===3){
            handleAddPostModal()
        }
        else if(useType===4){
            handleClickEventModal()
            return
        }
        else{
            return
        }
    }
    return ( 
        <div className='inline-flex flex-col justify-center'>
            <div onClick={handleClickEvent} ref={refName} onMouseEnter={()=>handleHoverEvent(true)} onMouseLeave={()=>handleHoverEvent(false)}  className="duration-200 rounded-full w-11 h-11 m-2 z-0 hover:bg-white hover:text-blue-700 bg-blue-700 flex shadow-xl justify-center items-center text-white cursor-pointer">
                {icon}
            </div>
            {showToolTip&&<Tooltip margin={5} text={tooltip}/>}
        </div>
     )
}