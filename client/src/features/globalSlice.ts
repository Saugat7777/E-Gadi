import { createSlice } from "@reduxjs/toolkit";
import { userDataAPI } from "../services/userDataAPI";

interface IbreadCumb {
  title: string;
}

interface IGlobalSlice {
  breadCumbs: IbreadCumb[];
  openTour: false | true;
}

const initialState: IGlobalSlice = {
  breadCumbs: [],
  openTour: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    handleBreadCumbs: (state, { payload }) => {
      state.breadCumbs = payload;
    },
    toggleTourState: (state) => {
      state.openTour = !state.openTour;
    },
  },
});

export const { handleBreadCumbs, toggleTourState } = globalSlice.actions;

export default globalSlice.reducer;
