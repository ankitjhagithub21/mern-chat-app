import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../app/userSlice'
import useGetMessages from '../hooks/useGetMessages'




const OtherUser = ({user}) => {
    useGetMessages()
    const dispatch = useDispatch()

    const {selectedUser} = useSelector(state=>state.user)
    const handleClick = async() =>{
         dispatch(setSelectedUser(user))
        
    }
    

    return (
        <div className={`flex gap-2 items-center  p-2 cursor-pointer rounded-lg border ${selectedUser?._id === user._id ? 'bg-gray-200':'hover:bg-gray-200'}`} onClick={handleClick}>
           <div className='avatar w-10 h-10 rounded-full'>
           <img src={`https://robohash.org/${user.fullName}`} alt="profile_pic" className='bg-gray-800 border  rounded-full ' />
           </div>
            <p className='text-lg'>{user.fullName}</p>
        </div>
    )
}

export default OtherUser
