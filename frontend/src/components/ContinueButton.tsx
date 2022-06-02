interface ContinueButtonProps {
    setCloseCreatePostModal: React.Dispatch<React.SetStateAction<boolean>>
    inputValue: string
    droppedImages: any[]
}

export default function ContinueButton({setCloseCreatePostModal, inputValue, droppedImages}:ContinueButtonProps) {
    return ( 
        // add checking for the dropped images aswell
        <div 
            onClick={() => {
                if(inputValue.length> 0 || droppedImages.length > 0){
                    setCloseCreatePostModal(false)        
                    }
                }
            }
            style={{background:inputValue?.length<1&&droppedImages.length<1?'#6b7280':undefined, opacity:inputValue?.length<1&&droppedImages.length<1?'60%':undefined, cursor:inputValue?.length<1&&droppedImages.length<1?'not-allowed':undefined}} className="flex items-center justify-center rounded-lg bg-blue-500 w-36 h-12 m-2 text-white font-semibold cursor-pointer"
            >
            Continue
        </div>
     )
}