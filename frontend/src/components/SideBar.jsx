import React from 'react'
import OtherUsers from './OtherUsers'
import SearchBar from './SearchBar'

const SideBar = () => {

    return (
        <div className='lg:w-1/3 w-full  flex flex-col gap-4 p-2 border-r'>
            <SearchBar/>
            <OtherUsers/>

        </div>
    )
}

export default SideBar
