import { createSlice } from "@reduxjs/toolkit";
import { userDataAPI } from "../services/userDataAPI";

interface IbreadCumb {
  title: string;
}

interface IGlobalSlice {
  breadCumbs: IbreadCumb[];
}

const initialState: IGlobalSlice = {
  breadCumbs: [],
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    handleBreadCumbs: (state, { payload }) => {
      state.breadCumbs = payload;
    },
  },
});

export const { handleBreadCumbs } = globalSlice.actions;

export default globalSlice.reducer;
