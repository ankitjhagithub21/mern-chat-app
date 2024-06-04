import React from 'react'
import Message from './Message'
import { useSelector } from 'react-redux'
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage.js'

const MessageContainer = () => {
   useGetRealTimeMessage()
    const messages = useSelector(state=>state.message.value)
    
    if(!messages || messages.length==0){
        return <div className='h-full bg-[#1abc9c] text-white text-center'>
          <p className='text-lg p-4'>Let's start conversation.</p>
        </div>;
    }
    return (
        <div className='overflow-auto p-2 h-full bg-[#1abc9c]  flex flex-col  gap-3 w-full '>
           
          {
            messages.map((message)=>{
                return <Message key={message._id} message={message}/>
            })
          }
        </div>
    )
}

export default MessageContainer
