import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../app/userSlice'
import useGetMessages from '../hooks/useGetMessages'



const OtherUser = ({user}) => {
    useGetMessages()
    const dispatch = useDispatch()

    const {selectedUser,onlineUsers} = useSelector(state=>state.user)
    const isOnline = onlineUsers?.includes(user._id)
    const handleClick = async() =>{
         dispatch(setSelectedUser(user))
        
    }
    

    

    return (
        <div className={`flex gap-2 items-center  p-2 cursor-pointer rounded-lg border ${selectedUser?._id === user._id ? 'bg-gray-200':'hover:bg-gray-200'}`} onClick={handleClick}>
           <div className={`avatar ${isOnline ? 'online':''} w-10 h-10 rounded-full`}>
           <img src={user.profilePhoto} alt="profile_pic" className='w-full h-full  object-contain object-center ' />
           </div>
            <p className='text-lg'>{user.fullName}</p>
        </div>
    )
}

export default OtherUser
