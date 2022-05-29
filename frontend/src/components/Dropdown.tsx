interface DropdownProps {
    dropdownRef: React.MutableRefObject<any>
}

export default function Dropdown({dropdownRef}:DropdownProps) {
    return ( 
        <div ref={dropdownRef} className="w-64 h-screen bg-gray-800">
            <div></div>
        </div>
     )
}