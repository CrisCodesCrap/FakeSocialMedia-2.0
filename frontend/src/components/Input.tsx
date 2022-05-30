interface InputProps {
    length: number
    changeValue: React.Dispatch<React.SetStateAction<string>>
    value: string
    type: string
}

export default function Input() {
    return ( 
                <div className="overflow-y-auto rounded-lg outline-none w-156 h-48 bg-white border inline-flex flex-col items-center border-gray-400">
                    <div className="w-full h-8 flex justify-start items-center">
                        <div className="ml-4 m-1 w-2.5 h-2.5 bg-red-600 rounded-full"/>
                        <div className="m-1 w-2.5 h-2.5 bg-yellow-600 rounded-full"/>
                        <div className="m-1 w-2.5 h-2.5 bg-green-600 rounded-full"/>
                    </div>
                    <div contentEditable={true} className='outline-none w-144 h-40'/>
                </div>
    )
}

