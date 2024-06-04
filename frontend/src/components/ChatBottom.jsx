import React, { useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../app/messageSlice';
import { useSocket } from '../SocketContext';
import toast from "react-hot-toast"
const ChatBottom = () => {
  const [message, setMessage] = useState('');
  const selectedUser = useSelector((state) => state.user.selectedUser);
  const [loading,setLoading] = useState(false)
  const messages = useSelector((state) => state.message.value);
  const dispatch = useDispatch();
  const socket = useSocket();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.length === 0) {
      return;
    }
    if(loading){
      
      return toast.error("A message is alredy sending...");
    }
    const tempMsg = message
    setMessage('')
    try {
      setLoading(true)
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/message/send/${selectedUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ message:tempMsg }),
      });

      const data = await res.json();
      if (data.success) {
       
        dispatch(setMessages([...messages, data.message]));
        if (socket) {
          socket.emit('sendMessage', data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  };

  return (
    <form className=' rounded-br-lg flex items-center px-2' onSubmit={handleSendMessage}>
      <input
        type='text'
        placeholder={loading ? 'Sending...':'Send a message..'}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className='w-full outline-none bg-transparent p-2 text-lg'
      />
      <button className='outline-none' type='submit'>
        <IoMdSend size={30} />
      </button>
    </form>
  );
};

export default ChatBottom;
