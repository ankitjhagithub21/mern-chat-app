import { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { setMessages } from '../app/messageSlice'

const useGetMessages = () => {
    const dispatch = useDispatch()
    const {selectedUser,authUser} = useSelector(state=>state.user)
    
   useEffect(()=>{
    const fetchMessages = async() =>{
        
        try{
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/message/${selectedUser?._id}`,{
                credentials:'include'
            })
            const data = await res.json()
            dispatch(setMessages(data.messages))

        }catch(error){
            console.log(error)
        }
    }
   if(authUser,selectedUser){
    fetchMessages()
   }
   },[selectedUser])
}

export default useGetMessages
