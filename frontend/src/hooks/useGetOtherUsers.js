import { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { setOtherUsers} from '../app/userSlice'
const useGetOtherUsers = () => {
    const dispatch = useDispatch()
    const authUser = useSelector(state=>state.user.authUser)
   useEffect(()=>{
    const fetchOtherUsers = async() =>{
        try{
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user`,{
                credentials:'include'
            })
            const data = await res.json()
            dispatch(setOtherUsers(data.otherUsers))
          

        }catch(error){
            console.log(error)
        }
    }
    if(authUser){
        fetchOtherUsers()
    }
   },[])
}

export default useGetOtherUsers
