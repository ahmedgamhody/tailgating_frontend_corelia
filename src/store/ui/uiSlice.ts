import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
  isChannelsSidebarOpen: boolean;
  isPlotsSidebarOpen: boolean;
  isAnomaliesSidebarOpen: boolean;
};

const initialState: InitialStateType = {
  isChannelsSidebarOpen: true,
  isPlotsSidebarOpen: false,
  isAnomaliesSidebarOpen: true,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openChannelsSidebar: (state) => {
      state.isChannelsSidebarOpen = true;
    },
    closeChannelsSidebar: (state) => {
      state.isChannelsSidebarOpen = false;
    },
    openPlotsSidebar: (state) => {
      state.isPlotsSidebarOpen = true;
    },
    closePlotsSidebar: (state) => {
      state.isPlotsSidebarOpen = false;
    },
    openAnomaliesSidebar: (state) => {
      state.isAnomaliesSidebarOpen = true;
    },
    closeAnomaliesSidebar: (state) => {
      state.isAnomaliesSidebarOpen = false;
    },
  },
});

export const {
  openChannelsSidebar,
  closeChannelsSidebar,
  openPlotsSidebar,
  closePlotsSidebar,
  openAnomaliesSidebar,
  closeAnomaliesSidebar,
} = uiSlice.actions;
export default uiSlice.reducer;
