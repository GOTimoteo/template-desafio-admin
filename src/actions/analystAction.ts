import { createAsyncThunk } from "@reduxjs/toolkit";
import analystSlice from "../slices/analystSlice";
import { getAnalysts } from "../services/analysts";

export const analystActions = analystSlice.actions;

export const fetchAnalysts = createAsyncThunk(
  "analysts/fetchAllAnalysts",
  async () => {
    const response = await getAnalysts();
    return response;
  }
);
