import React from 'react';
import ChatTop from './ChatTop';
import MessageContainer from './MessageContainer';
import ChatBottom from './ChatBottom';
import { useSelector } from 'react-redux';

const ChatContainer = () => {
    const selectedUser = useSelector((state) => state.user.selectedUser);

    return (
        <div className={`lg:flex flex-col w-full ${selectedUser ? 'flex' : 'hidden lg:flex'}`}>
            {
                selectedUser && <>
                    <ChatTop />
                    <MessageContainer />
                    <ChatBottom />
                </>
            }
        </div>
    );
};

export default ChatContainer;
