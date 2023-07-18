import { createSlice } from "@reduxjs/toolkit";
import { fetchFeatures } from "../actions/featureAction";

const featureSlice = createSlice({
  name: "features",
  initialState: {
    features: [] as Feature[],
    status: "idle" as requestStatus,
    error: undefined as requestError,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFeatures.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFeatures.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.features = action.payload;
      })
      .addCase(fetchFeatures.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default featureSlice;
