import SideBar from '../components/SideBar';
import ChatContainer from '../components/ChatContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedUser, setUser, setOtherUsers, setOnlineUsers } from '../app/userSlice';
import toast from 'react-hot-toast';
import handleLogout from '../helpers/handleLogout';
import { setMessages } from '../app/messageSlice';
import { useSocket } from '../SocketContext';


const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedUser } = useSelector((state) => state.user);
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
    <div className='w-full h-screen flex items-center justify-center'>
      <div className='lg:w-[90vw] w-full lg:h-[90vh] h-full flex lg:border border-0 rounded-lg'>
        <SideBar />
        {selectedUser ? (
          <ChatContainer />
        ) : (
          <div className='flex flex-col gap-2 items-center justify-center w-full h-full text-xl'>
            <h2 className='text-xl'>Welcome {authUser.fullName}</h2>
            <button
              onClick={handleClick}
              className='px-4 py-2 outline-none bg-red-500 text-white rounded-lg'
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
