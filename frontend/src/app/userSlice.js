import { createSlice } from '@reduxjs/toolkit'



export const userSlice = createSlice({
  name: 'user',
  initialState: {
    authUser: null,
    otherUsers: null,
    selectedUser:null,
    searchText:'',
    onlineUsers:null
  },
  reducers: {
    setUser: (state, action) => {
      state.authUser = action.payload
    },
    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload
    }

  },
})


export const { setUser, setOtherUsers,setSelectedUser,setSearchText,setOnlineUsers } = userSlice.actions

export default userSlice.reducer