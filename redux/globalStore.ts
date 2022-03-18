import { configureStore, combineReducers } from '@reduxjs/toolkit'
import sidebarSlice from './sidebarSlice'

const GlobalStore = configureStore({
  reducer: combineReducers({
    sidebar: sidebarSlice,
  }),
})

export type RootState = ReturnType<typeof GlobalStore.getState>

export default GlobalStore
