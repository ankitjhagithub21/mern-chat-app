import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOnlineUsers, setOtherUsers, setSelectedUser, setUser } from '../app/userSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { IoIosLogOut } from 'react-icons/io';
import handleLogout from '../helpers/handleLogout';
import { setMessages } from '../app/messageSlice';
import { useSocket } from '../SocketContext';

const ChatTop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedUser } = useSelector(state => state.user);
  const socket = useSocket();

  const handleClick = () => {
    handleLogout().then((data) => {
      if (data.success) {
        dispatch(setUser(null));
        dispatch(setOtherUsers(null));
        dispatch(setSelectedUser(null));
        dispatch(setOnlineUsers(null));
        dispatch(setMessages(null));
        if (socket) {
          socket.close();
        }
        toast.success(data.message);
        navigate('/login');
      }
    });
  };

  return (
    <div className='bg-gray-100 p-2 flex justify-between items-center'>
      <div className='flex items-center gap-2'>
        <img
          src={selectedUser?.profilePhoto}
          alt='profile_pic'
          className='w-10 h-10 rounded-full object-contain object-center'
        />
        <p className='text-lg'>{selectedUser?.fullName}</p>
      </div>
      <button
        className='px-2 py-2 border bg-[#2B3440] rounded-lg text-white text-lg'
        onClick={handleClick}
      >
        <IoIosLogOut />
      </button>
    </div>
  );
};

export default ChatTop;
