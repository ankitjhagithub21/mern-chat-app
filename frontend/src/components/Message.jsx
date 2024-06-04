import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

const Message = ({message}) => {
  const scroll = useRef()
  const {authUser,selectedUser} = useSelector(state=>state.user)
  
  useEffect(()=>{
    scroll.current?.scrollIntoView({behavior:"smooth"})
  },[message])
    return (
        <div className={`chat ${authUser._id==message.receiverId ? 'chat-end':'chat-start'}`} ref={scroll}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full bg-gray-800">
            <img alt="Tailwind CSS chat bubble component" src={authUser._id===message.senderId ? `https://robohash.org/${authUser.fullName}`:`https://robohash.org/${selectedUser.fullName}`} />
          </div>
        </div>
       
        <div className="chat-bubble">{message.message}</div>
       
      </div>
     
    )
}

export default Message
