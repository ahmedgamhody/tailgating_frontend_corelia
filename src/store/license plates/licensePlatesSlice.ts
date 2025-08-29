import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  license_plates: any[];
};

const initialState: InitialStateType = {
  license_plates: ["1", "0"],
};

const licensePlatesSlice = createSlice({
  name: "licensePlatesSlice",
  initialState,
  reducers: {
    addLicensePlates: (state, action) => {
      state.license_plates = action.payload;
    },
    removeLicensePlates: () => {
      return initialState;
    },
  },
});

export const { addLicensePlates, removeLicensePlates } =
  licensePlatesSlice.actions;
export default licensePlatesSlice.reducer;
