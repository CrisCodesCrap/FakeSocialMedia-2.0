interface RadioButtonProps {
    name: string
    color?: string
    clickColor?: string
    chosenButton: string
    setChosenButton: React.Dispatch<React.SetStateAction<string>>
}

export default function RadioButton({name,clickColor,color,chosenButton, setChosenButton}:RadioButtonProps) {

    return ( 
        <div style={{background:chosenButton!==name?'#6b7280':'#3b82f6'}} onClick={()=>setChosenButton(name)} className="select-none text-white font-semibold m-2 w-48 h-12 bg-blue-500 rounded-md cursor-pointer duration-200 flex items-center justify-start">
            <div style={{background:chosenButton!==name?'#374151':'#fff'}} className="w-2 h-2 bg-white rounded-full ml-5 m-2 duration-200"></div>
            {name}
        </div>
     )
}

