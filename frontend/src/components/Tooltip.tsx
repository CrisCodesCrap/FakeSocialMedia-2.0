interface TooltipProps {
    text:string
    margin: number
}

export default function Tooltip({text,margin}:TooltipProps) {
    return ( 
        <div style={{margin: margin+'rem'}} className="absolute text-white select-none shadow-xl flex justify-center items-center bg-black opacity-70 min-w-fit px-3 font-semibold rounded-lg h-12">
            {text}
        </div>
     );
}