import React from 'react'
import OtherUsers from './OtherUsers'
import SearchBar from './SearchBar'

const SideBar = () => {
    return (
        <div className='w-1/3 flex flex-col gap-4 p-2 border-r'>
            <SearchBar/>
            <OtherUsers/>

        </div>
    )
}

export default SideBar
