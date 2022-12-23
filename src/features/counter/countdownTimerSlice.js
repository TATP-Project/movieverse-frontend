import { createSlice } from "@reduxjs/toolkit";

const initTimer = {
    targetDate: 0,
    isExpired: false,
}


export const countdownTimerSlice = createSlice({
  name: "CountdownTimer",
  initialState: initTimer,
  reducers: {
    setTimer: (state, action) => {
        state.targetDate = action.payload
    },
    setTimerExpired: (state, action) => {
      state.isExpired = action.payload
    },
  },
});

export const { setTimer, setTimerExpired } = countdownTimerSlice.actions;

export default countdownTimerSlice.reducer;
