import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from './redux/pasteSlice'   // ✅ no curly braces

export const store = configureStore({
  reducer: {
    paste: pasteReducer,
  },
})
