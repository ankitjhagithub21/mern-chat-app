import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosClose } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { setOtherUsers, setSelectedUser, setUser } from '../app/userSlice';
import { setMessages } from '../app/messageSlice';
import { useSocket } from '../SocketContext';
import { useNavigate } from 'react-router-dom';
import handleLogout from "../helpers/handleLogout"

const ChatTop = () => {

  const { selectedUser,authUser } = useSelector(state => state.user);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isOpen,setIsOpen] = useState(false)
  const socket = useSocket()
  const handleClick = () => {
    handleLogout().then((data) => {
      if (data.success) {
        dispatch(setUser(null));
        dispatch(setOtherUsers(null));
        dispatch(setSelectedUser(null));
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
    <div className='p-2 rounded-lg flex justify-between items-center relative'>
     
      <div className='flex items-center gap-2'>
      
        <img
          src={`https://robohash.org/${selectedUser.fullName}`}
          alt='profile_pic'
          className='w-10 h-10 rounded-full bg-gray-800'
        />
        <p className='text-lg'>{selectedUser?.fullName}</p>
      </div>
      <div className='flex items-center gap-1'>
      {
        selectedUser && <button className='lg:hidden bg-gray-200 px-2 py-1 rounded-lg' onClick={()=>dispatch(setSelectedUser(null))}>
          Back
        </button>
      }
      <BsThreeDotsVertical size={25} className='cursor-pointer' onClick={()=>setIsOpen(true)}/>
      </div>
      <div className={`${isOpen ? 'absolute':'hidden'} rounded-lg p-5 bg-gray-200 shadow-lg right-1 top-14 z-10 flex items-center flex-col gap-2`}>

       <div className='absolute top-0 right-0'>
      
      <IoIosClose size={25} className='cursor-pointer' onClick={()=>setIsOpen(false)}/>
       </div>
       <h2 className='border-b border-green-500'>Your Profile</h2>
         <img src={`https://robohash.org/${authUser.fullName}`} alt="profile_pic" className='w-14 h-14 bg-gray-800 rounded-full' />
         <h2 className='text-lg'>{authUser.fullName}</h2>
         <p className='text-sm'>Username: {authUser.username}</p>
         <button className='rounded-full bg-white px-4 py-1 hover:bg-red-500  hover:text-white' onClick={handleClick}>Logout</button>
      </div>
    </div>
  );
};

export default ChatTop;
