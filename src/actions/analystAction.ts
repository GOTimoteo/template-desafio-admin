import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAnalysts } from "../services/analysts";

export const fetchAnalysts = createAsyncThunk(
  "analysts/fetchAllAnalysts",
  async () => {
    const response = await getAnalysts();
    return response;
  }
);
