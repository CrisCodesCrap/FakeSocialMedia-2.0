interface InputStageTwoProps {
    droppedImages?: any[]
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
            <div>

            </div>
        )
    }
    return(
        <div>

        </div>
    )
}

