import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFeatures } from "../services/features";

export const fetchFeatures = createAsyncThunk(
  "features/fetchAllFeatures",
  async () => {
    const response = await getFeatures();
    return response;
  }
);
