import { createAsyncThunk } from "@reduxjs/toolkit";
import featureSlice from "../slices/featureSlice";
import { getFeatures } from "../services/features";

export const featureActions = featureSlice.actions;

export const fetchFeatures = createAsyncThunk(
  "features/fetchAllFeatures",
  async () => {
    const response = await getFeatures();
    return response;
  }
);
