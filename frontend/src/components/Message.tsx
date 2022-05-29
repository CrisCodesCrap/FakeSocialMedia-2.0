import moment from 'moment'

interface MessageProps{
    message:string
    user:string
    timestamp:string
    isCurrentUser:boolean
}

export default function Message({message, isCurrentUser, timestamp, user}:MessageProps) {
    
    return ( 
        <div className='inline-flex flex-row w-full items-center'>
            <div className='rounded-full bg-blue-700 w-9 h-9 ml-3'/>
            <div className='inline-flex flex-col bg-blue-600 m-2 p-1.5 text-ellipsis h-fit w-2/3 text-white rounded-3xl'>
                <div className='text-base mx-2'>
                    {message}
                </div>
                <div className='text-xs mx-2'>
                    sent by you {moment(timestamp).fromNow()}.
                </div>
            </div>
        </div>
     )
}

