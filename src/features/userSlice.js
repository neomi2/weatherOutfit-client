// import { createSlice } from "@reduxjs/toolkit";

// const initial = {
//   currentUser: null,
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState: initial,
//   reducers: {
//     userIn: (state, action) => {
//       state.currentUser = action.payload;
//     }, 
//     logOut: (state, action) => {
//       state.currentUser = null;
//     },
//   },
// });

// export const { logOut, userIn } = userSlice.actions;
// export default userSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

// טוען מה־localStorage אם יש
const savedUser = localStorage.getItem("currentUser");

const initial = {
  currentUser: savedUser ? JSON.parse(savedUser) : null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initial,
  reducers: {
    userIn: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(action.payload)); // שמירת המשתמש ב־localStorage
    },
    logOut: (state, action) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
  },
});

export const { logOut, userIn } = userSlice.actions;
export default userSlice.reducer;