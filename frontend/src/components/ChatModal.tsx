import { useState,useRef, useEffect } from "react"
import Tooltip from "./Tooltip"
import {FaCog, FaTimes} from 'react-icons/fa'
import Message from "./Message"

interface ModalProps {
    setShowChatModal: any
    modalRef: React.MutableRefObject<any>
    buttonRef: React.MutableRefObject<any>
}

// Implement is so when a group or a user's name is longer than a certain amount of chars it cuts off the rest of the name and adds ellipsis

export default function ChatModal({setShowChatModal,modalRef,buttonRef}:ModalProps) {

    const [isFocused, setIsFocused] = useState<boolean>(false)
    const [showCloseTooltip, setshowCloseTooltip] = useState<boolean>(false)
    const [showSettingsTooltip, setshowSettingsTooltip] = useState<boolean>(false)
    const [showNameTooltip, setshowNameTooltip] = useState<boolean>(false)
    const [isSettingsMode, setIsSettingsMode] = useState<boolean>(false)

    let height:number = window.innerHeight / 2
    function handleHoverEvent(hoverIn:boolean,type:number){
        if(hoverIn){
            if(type === 1){
                setshowCloseTooltip(true)
            }else if(type === 2){
                setshowSettingsTooltip(true)
            }else{
                setshowNameTooltip(true)
            }
                return
            }
        
        if(type === 1){
            setshowCloseTooltip(false)
        }else if(type === 2){
            setshowSettingsTooltip(false)
        }else{
            setshowNameTooltip(false)
        }
    
    }

    function handleWindowClick(e:any){
        if(modalRef.current === null) return
        if (!modalRef.current.contains(e.target) && !buttonRef.current.contains(e.target)) {
            setIsFocused(false)
            return
        }
        setIsFocused(true)
    }

    useEffect(
        ()=>{
        document.addEventListener('click',(e:any)=>handleWindowClick(e))
        return () => document.removeEventListener('click',(e:any)=>handleWindowClick(e))

    },[])
    
    return ( 
        <div ref={modalRef} className="flex justify-center items-start h-1/2 w-1/4 overflow-hidden rounded-t-2xl shadow-allaround absolute top-1/2 left-2/3">
            <div className="inline-flex flex-col w-full">
            <div style={{background:!isFocused?'linear-gradient(to left top, rgb(107, 114, 128), rgb(148, 163, 184))':undefined}} className="bg-gradient-to-br from-sky-500 to-blue-600 h-16 w-full shadow-allaround rounded-t-2xl flex justify-between items-center">
                <div className="inline-flex justify-center items-center text-white">
                    <div className="m-3 mr-1 h-9 w-9 overflow-visible bg-blue-800 rounded-full cursor-pointer"/>
                    <div className="inline-flex flex-col h-7 items-start justify-center">
                        <div className="font-semibold text-sm">Insert name variable here:</div>
                        <div className="text-xs text-white">Insert timestamp here:</div>
                    </div>
                </div>
                <div>
                    <div className="inline-flex items-center  flex-col">
                        <FaCog onMouseEnter={()=>handleHoverEvent(true,2)} onMouseLeave={()=>handleHoverEvent(false,2)} onClick={()=>setIsSettingsMode(!isSettingsMode)} className="m-1 w-5 h-5 cursor-pointer rounded-full text-white hover:scale-105 duration-500"/>
                        {showSettingsTooltip&&<Tooltip margin={-4} text={'Open the chat settings'}/>}
                    </div>
                    <div className="inline-flex items-center  flex-col">
                        <FaTimes onMouseEnter={()=>handleHoverEvent(true,1)} onMouseLeave={()=>handleHoverEvent(false,1)} onClick={()=>setShowChatModal(false)} className="m-3 w-5 h-5 cursor-pointer rounded-full text-white hover:scale-105 duration-500"/>
                        {showCloseTooltip&&<Tooltip margin={-4} text={'Close the chat window'}/>}
                    </div>
                </div>
            </div>
            <ul className="inline-flex flex-col overflow-y-scroll scrollbar-thumb-gray-500" style={{height:height-height-64+'px'}}>
            <Message user={'koki'} timestamp={'2012-01-17 09:08:05'} isCurrentUser={true} message={'zdr, bepce kp?'}/>
                <Message user={'koki'} timestamp={'2012-01-17 09:08:05'} isCurrentUser={true} message={'zdr, bepce kp?'}/>
                <Message user={'koki'} timestamp={'2012-01-17 09:08:05'} isCurrentUser={true} message={'zdr, bepce kp?'}/>
                <Message user={'koki'} timestamp={'2012-01-17 09:08:05'} isCurrentUser={true} message={'zdr, bepce kp?'}/>
                <Message user={'koki'} timestamp={'2012-01-17 09:08:05'} isCurrentUser={true} message={'zdr, bepce kp?'}/>
                <Message user={'koki'} timestamp={'2012-01-17 09:08:05'} isCurrentUser={true} message={'zdr, bepce kp?'}/>
                <Message user={'koki'} timestamp={'2012-01-17 09:08:05'} isCurrentUser={true} message={'zdr, bepce kp?'}/>
            </ul>
            </div>
        </div>
     )
}