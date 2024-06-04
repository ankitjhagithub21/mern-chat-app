import React from 'react'
import ChatTop from './ChatTop'
import MessageContainer from './MessageContainer'
import ChatBottom from './ChatBottom'


const ChatContainer = () => {
  
  return (
    <div className='flex flex-col lg:w-full '>
        <ChatTop/>
        <MessageContainer/>
        <ChatBottom/>
    </div>
  )
}

export default ChatContainer
