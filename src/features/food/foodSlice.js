import { createSlice } from "@reduxjs/toolkit";

const initFood = {};

export const foodSlice = createSlice({
    name: "food",
    initialState: initFood,
    reducers: {
        setSelectedFood: (state, action) => {
            return action.payload;
        },
    },
});

export const { setSelectedFood } = foodSlice.actions;

export default foodSlice.reducer;