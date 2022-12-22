import { createSlice } from "@reduxjs/toolkit";

const initTimer = {
    targetDate: 0
}


export const countdownTimerSlice = createSlice({
  name: "CountdownTimer",
  initialState: initTimer,
  reducers: {
    setTimer: (state, action) => {
        state.targetDate = action.payload
    },
  },
});

export const { setTimer } = countdownTimerSlice.actions;

export default countdownTimerSlice.reducer;
