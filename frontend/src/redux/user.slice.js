import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userData: null,
  theme: localStorage.getItem("theme") || "classic"
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "classic" ? "neo-glass" : "classic";
      localStorage.setItem("theme", state.theme);
    }
  },
})

export const { setUserData, toggleTheme } = userSlice.actions

export default userSlice.reducer