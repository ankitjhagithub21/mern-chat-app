import React, { createContext, useContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children, authUser }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (authUser) {
      const newSocket = io(`${import.meta.env.VITE_SERVER_URL}`, {
        query: {
          userId: authUser._id,
        },
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
