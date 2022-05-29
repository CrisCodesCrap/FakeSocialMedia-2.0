import { useState } from "react"
import Tooltip from "./Tooltip"

interface MessageIconProps{
    icon:JSX.Element
    onClick:Function
    tooltip:string
}

export default function MessageIcon({icon, onClick, tooltip}: MessageIconProps) {
    
    const [showTooltip, setShowTooltip] = useState<boolean>(false)

    return ( 
        <div className="inline-flex flex-col items-center cursor-pointer m-3">
            <div onMouseEnter={()=>setShowTooltip(true)} onMouseLeave={()=>setShowTooltip(false)} onClick={()=>onClick} className="rounded-full h-fit w-fi">
                {icon}
            </div>
            {showTooltip&&<Tooltip text={tooltip} margin={-4}/>}
        </div>
     )
}