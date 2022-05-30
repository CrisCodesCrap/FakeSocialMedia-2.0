import moment from 'moment'

interface MessageProps{
    key: string
    message:string
    user:string
    timestamp:string
    isCurrentUser:boolean
}

export default function Message({message, isCurrentUser, timestamp, user, key}:MessageProps) {
    
    if(isCurrentUser){
        return ( 
            <div key={key} className='inline-flex flex-row-reverse items-center'>
                <div className='rounded-full bg-purple-700 w-9 h-9 mr-3'/>
                <div className='inline-flex flex-col bg-purple-600 m-2 p-1.5 text-ellipsis h-fit min-w-fit max-w-xs text-white rounded-3xl'>
                    <div className='text-base mx-2 text-right'>
                        {message}
                    </div>
                    <div className='text-xs mx-2 text-right'>
                        sent by you {moment(timestamp).fromNow()}.
                    </div>
                </div>
            </div>
        )
    }
    
    return ( 
        <div key={key} className='inline-flex flex-row  items-center'>
            <div className='rounded-full bg-blue-700 w-9 h-9 ml-3'/>
            <div className='inline-flex flex-col bg-blue-600 m-2 p-1.5 text-ellipsis min-h-fit break-words max-w-2/3 text-white rounded-3xl'>
                <div className='text-base mx-2'>
                    {message}
                </div>
                <div className='text-xs mx-2'>
                    sent by {user} {moment(timestamp).fromNow()}.
                </div>
            </div>
        </div>
    )
}

