import { createSlice } from "@reduxjs/toolkit";

export interface IScrollInitialState {
  scrollEnabled: boolean;
}

const initialState: IScrollInitialState = {
  scrollEnabled: true,
};

const gameSlice = createSlice({
  name: "scroll",
  initialState,
  reducers: {
    scrollEnabled: (state) => {
      state.scrollEnabled = true;
    },
    scrollDisable: (state) => {
      state.scrollEnabled = false;
    },
  },
});

export const { scrollDisable,scrollEnabled } = gameSlice.actions;

export default gameSlice.reducer;
