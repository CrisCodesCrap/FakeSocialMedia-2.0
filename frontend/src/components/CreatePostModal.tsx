import { FaTimes } from "react-icons/fa"
import Icon from "./Icon"

interface CreatePostModalProps {
    closedCreatePostModal: boolean
    setCloseCreatePostModal: React.Dispatch<React.SetStateAction<boolean>>
}

function CreatePostModal({setCloseCreatePostModal, closedCreatePostModal}:CreatePostModalProps) {
    
    
    return ( 
        <div className="flex absolute">
            <div className="flex items-start justify-end bg-black z-10 opacity-90 w-screen h-screen"/>
            <div className="translate-x-1/2 rounded-lg translate-y-1/4 flex items-start justify-center w-1/2 h-2/3 absolute bg-white z-10">
                <div className="flex rounded-t-lg items-center justify-between bg-blue-500 w-full h-1/8">
                    <div className="m-4 text-white font-semibold">
                        Header
                    </div>
                    <Icon useType={3} setCloseCreatePostModal={setCloseCreatePostModal} closedCreatePostModal={closedCreatePostModal}  icon={<FaTimes/>} tooltip={'Close the window'}/>
                </div>
            </div>
        </div>
     )
 }

export default CreatePostModal;