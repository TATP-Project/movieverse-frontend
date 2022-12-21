import { createSlice } from "@reduxjs/toolkit";

const initSeatSelection = {
  movieSessionId: "",
  seats: [],
};

export const seatSelectionSlice = createSlice({
  name: "seatSelection",
  initialState: initSeatSelection,
  reducers: {
    setSeatSelection(state, action) {
      state.movieSessionId = action.payload.movieSessionId
      state.seats = action.payload.seats
    },
    setSeatsStatus(state, action) {
      state.seats.map((seat) => seat.status = action.payload)
    },
  },
});

export const { setSeatSelection, setSeatsStatus } = seatSelectionSlice.actions;
export default seatSelectionSlice.reducer;
