import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
  timestamp: string;
};

const initialState: InitialStateType = {
  timestamp: "",
};

const anomaliesSlice = createSlice({
  name: "anomalies",
  initialState,
  reducers: {
    setTimestamp: (state, action) => {
      state.timestamp = action.payload;
    },
    resetTimestamp: (state) => {
      state.timestamp = "";
    },
  },
});

export const { setTimestamp, resetTimestamp } = anomaliesSlice.actions;
export default anomaliesSlice.reducer;
