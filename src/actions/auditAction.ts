import { createAsyncThunk } from "@reduxjs/toolkit";
import auditSlice from "../slices/auditSlice";
import { getAudits } from "../services/audits";

export const auditActions = auditSlice.actions;

export const fetchAudits = createAsyncThunk(
  "audits/fetchAllAudits",
  async () => {
    const response = await getAudits();
    return response;
  }
);
