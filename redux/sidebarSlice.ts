import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './globalStore'

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    value: {
      pasien: false,
      obat: false
    },
  },
  reducers: {
    changeSidebar: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { changeSidebar } = sidebarSlice.actions

export const selectSidebarValue = (state: RootState) => state.sidebar.value

export default sidebarSlice.reducer
