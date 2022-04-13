import { configureStore, combineReducers } from '@reduxjs/toolkit'
import obatSlice from './obatSlice'
import sidebarSlice from './sidebarSlice'

const GlobalStore = configureStore({
  reducer: combineReducers({
    sidebar: sidebarSlice,
    obat: obatSlice,
  }),
})

export type RootState = ReturnType<typeof GlobalStore.getState>

export default GlobalStore
