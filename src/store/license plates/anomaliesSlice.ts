import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  anomalies: any[];
};

const initialState: InitialStateType = {
  anomalies: [],
};

const anomaliesSlice = createSlice({
  name: "anomaliesSlice",
  initialState,
  reducers: {
    addAnomalies: (state, action) => {
      state.anomalies = action.payload;
    },
    removeAnomalies: () => {
      return initialState;
    },
  },
});

export const { addAnomalies, removeAnomalies } = anomaliesSlice.actions;
export default anomaliesSlice.reducer;
