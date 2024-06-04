import React, { useState } from 'react'
import { GoSearch } from "react-icons/go"
import { useDispatch, useSelector } from 'react-redux'
import { setSearchText } from '../app/userSlice'
const SearchBar = () => {
    const searchText = useSelector(state=>state.user.searchText)
    const dispatch = useDispatch()
    return (
        <div className='flex gap-1 items-center'>
            <input type="text" value={searchText} onChange={(e)=>dispatch(setSearchText(e.target.value))} placeholder='Search' className='border outline-none w-full bg-transparent  rounded-lg p-2' />
            <button className='border p-2 rounded-lg text-2xl hover:bg-gray-200'>
                <GoSearch />
            </button>
        </div>
    )
}

export default SearchBar
