import { useState } from "react"
import Tooltip from "./Tooltip"

interface MessageIconProps{
    icon:JSX.Element
    onClick:Function
    tooltip:string
    margin:number
}

export default function MessageIcon({icon, onClick, tooltip, margin}: MessageIconProps) {
    
    const [showTooltip, setShowTooltip] = useState<boolean>(false)

    return ( 
        <div className="inline-flex flex-col items-center cursor-pointer m-3" style={{margin:margin*4+'px'}}>
            <div onMouseEnter={()=>setShowTooltip(true)} onMouseLeave={()=>setShowTooltip(false)} onClick={()=>{
                onClick()
                setShowTooltip(false)
            }} 
            className="rounded-full h-fit w-fi">
                {icon}
            </div>
            {showTooltip&&<Tooltip text={tooltip} margin={-4}/>}
        </div>
     )
}