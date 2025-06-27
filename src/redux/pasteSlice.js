// src/features/counter/counterSlice.js

import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

// Safely parse localStorage data
let initialPastes = [];

try {
  const saved = localStorage.getItem('pastes');
  initialPastes = saved ? JSON.parse(saved) : [];
} catch (error) {
  console.error("Invalid JSON in localStorage:", error);
  localStorage.removeItem('pastes'); // Optional: clear bad data
}

const initialState = {
  pastes: initialPastes,
};

 const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state,action) => {
      //pushing the pastes into local storage
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes",JSON.stringify(state.pastes));
      toast("Paste Created Succcessfully");
      
    },
    updateToPastes: (state,action) => {
      const paste=action.payload;
      const index=state.pastes.findIndex((item)=> item._id === paste._id);

      if(index>=0){
        state.pastes[index]=paste;
        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast.success("Paste Updated");
      }
    },
    resetAllPastes: (state, action) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
      
    },
    removeFromPastes: (state, action) => {
      const pasteId= action.payload;
      const index = state.pastes.findIndex((item)=> item._id === pasteId);

      if(index>=0){
        state.pastes.splice(index,1);
        localStorage.setItem("pastes" , JSON.stringify(state.pastes));
        toast.success("paste deleted");
      }
      
    },

  },
});

export const {
  addToPastes,
  updateToPastes,
  resetAllPastes,
  removeFromPastes,
 
} = pasteSlice.actions;

export default pasteSlice.reducer;
