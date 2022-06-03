interface UserIconProps {
    icon?: any 
    size?: number
    margin?: number
}

export default function UserIcon({icon, size,margin}:UserIconProps) {
    return ( 
        <div style={{height:size!==undefined?size+'rem':undefined, width:size!==undefined?size+'rem':undefined, margin:margin!==undefined?margin/4+'rem':undefined}} className="select-none w-12 h-12 bg-white rounded-full m-4 shadow-xl cursor-pointer duration-200"/>
     );
}

