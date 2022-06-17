import { FaEllipsisH } from "react-icons/fa"
import UserIcon from "./UserIcon"

interface InputStageTwoProps {
    droppedImages: any[]
    setDroppedImages?: React.Dispatch<React.SetStateAction<any[]>>
    inputValue: string
    setInputValue: React.Dispatch<React.SetStateAction<string>>
    type: string
    heading: string
    setHeading: React.Dispatch<React.SetStateAction<string>>

}

export default function InputStageTwo({inputValue, setInputValue, type, droppedImages, setDroppedImages, heading, setHeading}:InputStageTwoProps) {
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
            <div className="inline-flex items-start justify-between flex-row rounded-lg w-156 h-96 ">
                    <div className="inline-flex flex-col items-start justify-center mt-12">
                        <div className="h-10 max-w-72 w-72 rounded-t-lg bg-blue-500 flex items-center justify-between">
                            <div className="inline-flex flex-row items-center">
                                <UserIcon size={1.25} margin={2}/>
                                {/* Name variable here*/}
                                <div className="text-white font-semibold cursor-pointer">
                                    Name here:
                                </div>
                            </div>
                            <div>
                                <FaEllipsisH className="h-5 w-5 m-2 text-white cursor-pointer"/>
                            </div>
                        </div>
                        <div className="w-72 h-72 overflow-hidden flex items-center justify-center bg-black bg-opacity-90">
                            <img src={droppedImages[0]} className="object-contain min-h-full max-h-full overflow-hidden"/>
                        </div>
                        <div id='headingholder' className="max-h-16 overflow-y-auto rounded-b-lg bg-blue-500 max-w-72 w-72 break-all ">
                            <div className="m-2 text-white font-semibold overflow-y-hidden">
                                {heading}
                            </div>
                        </div>
                    </div>
                <div contentEditable={true} onInput={(e:any)=>{
                    console.log(e.currentTarget.textContent)
                    if(e.target.currentTarget.textContent.length < heading.length || heading.length < 80){
                       setHeading(e.currentTarget.textContent)
                        }
                    }} className="w-72 outline-none rounded-lg min-h-fit p-2 mt-12 border border-gray-400 border-opacity-70 pl-2 pr-2" placeholder="Type whatever heading you want!">
                        {heading}
                    </div>
            </div>
        )
    }
    return(
        <div>

        </div>
    )
}

