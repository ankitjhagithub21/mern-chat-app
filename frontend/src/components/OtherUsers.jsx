import React, { useState, useEffect } from 'react'
import OtherUser from './OtherUser'
import useGetOtherUsers from '../hooks/useGetOtherUsers'
import { useSelector } from 'react-redux'

const OtherUsers = () => {
  useGetOtherUsers()
  const { otherUsers, searchText} = useSelector(state => state.user)

  const [filteredUsers, setFilteredUsers] = useState([])

  useEffect(() => {
    if (otherUsers) {
      const filtered = otherUsers.filter(user =>
        user.fullName.toLowerCase().includes(searchText.toLowerCase())
      )
      setFilteredUsers(filtered)
    }
  }, [otherUsers, searchText])

  if (!otherUsers) {
    return null
  }

  return (
    <div className='flex flex-col gap-2 overflow-auto'>
      {filteredUsers.length==0 ? <div>No User Found.</div> : <>
      
      {
        filteredUsers.map(user => (
          <OtherUser key={user._id} user={user} />
        ))
      }
      </>}
    </div>
  )
}

export default OtherUsers
