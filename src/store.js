import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from './redux/pasteSlice'; // ✅ Correct relative path

export const store = configureStore({
  reducer: {

    paste: pasteReducer,

  },
});