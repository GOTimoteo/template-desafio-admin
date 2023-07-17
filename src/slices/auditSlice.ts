import { createSlice } from "@reduxjs/toolkit";
import { fetchAudits } from "../actions/auditAction";
import { changeCardStatus, removeCard } from "actions/cardAction";

const auditSlice = createSlice({
  name: "audits",
  initialState: {
    audits: [] as Audit[],
    status: "idle" as requestStatus,
    error: undefined as requestError,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAudits.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAudits.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.audits = action.payload;
      })
      .addCase(fetchAudits.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(changeCardStatus.fulfilled, (state, { payload }) => {
        state.audits = [...state.audits, payload.audit];
      })
      .addCase(removeCard.fulfilled, (state, { payload }) => {
        state.audits = [...state.audits, payload.audit];
      });
  },
});

export default auditSlice;
