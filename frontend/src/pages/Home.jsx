import SideBar from '../components/SideBar';
import ChatContainer from '../components/ChatContainer';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import getUserFromServer from '../helpers/getUserFromServer';
import { setUser } from '../app/userSlice';
import Loading from '../components/Loading';



const Home = () => {

  const { authUser,selectedUser } = useSelector((state) => state.user);
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(()=>{
    getUserFromServer().then((data)=>{
      if(data.success){
        dispatch(setUser(data.user)) 
      }else{
        dispatch(setUser(null))
      }
    }).catch((error)=>{
      console.log(error)
    }).finally(()=>{
      setLoading(false)
    })
  },[]) 


  if(loading){
    return <Loading/>
  }
  
  if(!authUser){
    return <Navigate to={"/login"}/>
  }

  return (
    <div className='w-full h-screen flex items-center justify-center bg-[#1abc9c]'>
      <div className='w-[90%] h-[90vh] bg-white rounded-lg shadow-lg flex main-container'>
        <SideBar />
        {selectedUser ? (
          <ChatContainer />
        ) : (
          <div className='flex flex-col gap-2 items-center justify-center w-full h-full text-xl'>
            <h2 className='text-2xl font-semibold'>Welcome {authUser?.fullName}</h2>
            <p className='text-lg'>Let's Start Conversation.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
