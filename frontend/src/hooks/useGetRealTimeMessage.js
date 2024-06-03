import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../app/messageSlice';
import { useSocket } from '../SocketContext';

const useGetRealTimeMessage = () => {
  const socket = useSocket();
  const messages = useSelector((state) => state.message.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      dispatch(setMessages([...messages, newMessage]));
    };

    if (socket) {
      socket.on('newMessage', handleNewMessage);
    }

    return () => {
      if (socket) {
        socket.off('newMessage', handleNewMessage);
      }
    };
  }, [socket, dispatch, messages]);

  return null;
};

export default useGetRealTimeMessage;
