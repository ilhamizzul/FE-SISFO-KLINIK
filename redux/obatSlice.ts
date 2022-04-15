import { createSlice } from '@reduxjs/toolkit'
import { Transaksi } from '../types/pasien'
import { RootState } from './globalStore'

interface transaksi_state {
  value: Transaksi[]
}
const initialState: transaksi_state = {
  value: [],
}

const obatSlice = createSlice({
  name: 'obat',
  initialState,
  reducers: {
    addObat: (state, action) => {
      state.value = [...state.value, action.payload]
    },
    deleteObat: (state, action) => {
      const filtered = state.value.filter((data: Transaksi) => {
        return data.IdObat !== action.payload
      })
      state.value = filtered
    },
    plusObat: (state, action) => {
      const newArr = [...state.value]
      newArr[action.payload].Jumlah++
      state.value = newArr
    },
    minusObat: (state, action) => {
      const newArr = [...state.value]
      if (newArr[action.payload].Jumlah > 1) newArr[action.payload].Jumlah--
      state.value = newArr
    },
  },
})

export const { addObat, deleteObat, plusObat, minusObat } = obatSlice.actions

export const selectObatValue = (state: RootState) => state.obat.value

export default obatSlice.reducer
