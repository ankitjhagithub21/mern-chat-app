import React, { useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../app/messageSlice';
import { useSocket } from '../SocketContext';

const ChatBottom = () => {
  const [message, setMessage] = useState('');
  const selectedUser = useSelector((state) => state.user.selectedUser);
  const messages = useSelector((state) => state.message.value);
  const dispatch = useDispatch();
  const socket = useSocket();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.length === 0) {
      return;
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/message/send/${selectedUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage('');
        dispatch(setMessages([...messages, data.message]));
        if (socket) {
          socket.emit('sendMessage', data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className=' rounded-br-lg flex items-center px-2' onSubmit={handleSendMessage}>
      <input
        type='text'
        placeholder='Send a message...'
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
