import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAudits } from "../services/audits";

export const fetchAudits = createAsyncThunk(
  "audits/fetchAllAudits",
  async () => {
    const response = await getAudits();
    return response;
  }
);
