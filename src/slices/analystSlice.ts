import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchAnalysts } from "../actions/analystAction";

const analystSlice = createSlice({
  name: "analysts",
  initialState: {
    analysts: [] as Analyst[],
    loggedAnalyst: {} as Analyst,
    status: "idle" as requestStatus,
    error: undefined as requestError,
  },
  reducers: {
    setLoggedAnalyst: (state, { payload }: PayloadAction<Analyst>) => {
      state.loggedAnalyst = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAnalysts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAnalysts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.analysts = action.payload;
      })
      .addCase(fetchAnalysts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default analystSlice;
