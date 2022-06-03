import UserIcon from "./UserIcon"

interface InputStageTwoProps {
    droppedImages: any[]
    setDroppedImages?: React.Dispatch<React.SetStateAction<any[]>>
    inputValue: string
    setInputValue: React.Dispatch<React.SetStateAction<string>>
    type: string

}

export default function InputStageTwo({inputValue, setInputValue, type, droppedImages, setDroppedImages}:InputStageTwoProps) {
    if(type === 'Thread'){
        return(
            <div>

            </div>
        )
    }
    else if(type === 'Status'){
        return(
            <div>

            </div>
        )
    }
    else if(type === 'Picture'){
        return(
            <div className="inline-flex items-center justify-between flex-row rounded-lg w-156 h-96 ">
                    <div className="inline-flex flex-col items-start justify-center">
                        <div className="h-10 w-full rounded-t-lg bg-blue-500 flex items-center">
                            <UserIcon size={1.25} margin={2}/>
                            {/* Name variable here*/}
                            <div className="text-white font-semibold">
                                Name here:
                            </div>
                        </div>
                        <div className="w-72 h-72 flex items-center justify-center bg-black bg-opacity-90">
                            <img src={droppedImages[0]} className="object-contain overflow-hidden rounded-sm"/>
                        </div>
                        <div className="h-10 w-full rounded-b-lg bg-blue-500">

                        </div>
                    </div>
                <input className="w-72 outline-none rounded-lg h-12 border border-gray-400 border-opacity-70 pl-2" placeholder="Add a heading for your picture"/>
            </div>
        )
    }
    return(
        <div>

        </div>
    )
}

