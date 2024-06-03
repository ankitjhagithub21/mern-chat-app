import { createSlice } from '@reduxjs/toolkit'



export const messageSlice = createSlice({
  name: 'message',
  initialState: {
   value:null
  },
  reducers: {
    setMessages: (state, action) => {
      state.value = action.payload
    },
    

  },
})


export const { setMessages} = messageSlice.actions

export default messageSlice.reducer