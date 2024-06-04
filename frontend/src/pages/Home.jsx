import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import getUserFromServer from '../helpers/getUserFromServer';
import { setUser } from '../app/userSlice';
import Loading from '../components/Loading';
import SideBar from '../components/SideBar';
import ChatContainer from '../components/ChatContainer';

const Home = () => {
    const { authUser } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        getUserFromServer().then((data) => {
            if (data.success) {
                dispatch(setUser(data.user));
            } else {
                dispatch(setUser(null));
            }
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setLoading(false);
        });
    }, [dispatch]);

    if (loading) {
        return <Loading />;
    }

    if (!authUser) {
        return <Navigate to="/login" />;
    }

    return (
        <div className='w-full h-screen flex items-center justify-center bg-[#1abc9c] '>
            <div className='w-[90%] h-[90vh] bg-white rounded-lg shadow-lg flex'>
                <SideBar />
                <ChatContainer />
            </div>
        </div>
    );
};

export default Home;
