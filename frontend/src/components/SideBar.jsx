import React from 'react';
import OtherUsers from './OtherUsers';
import SearchBar from './SearchBar';
import { useSelector} from 'react-redux';


const SideBar = () => {
    const selectedUser = useSelector((state) => state.user.selectedUser);
   

   
    return (
        <div className={`lg:w-1/3 w-full flex flex-col gap-4 p-2 border-r ${selectedUser ? 'hidden lg:flex' : 'flex'}`}>
            <SearchBar />
            <OtherUsers />
           
        </div>
    );
};

export default SideBar;
