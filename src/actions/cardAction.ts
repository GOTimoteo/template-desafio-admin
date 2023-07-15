import { createAsyncThunk } from "@reduxjs/toolkit";
import cardSlice from "../slices/cardSlice";
import { getCards, putCard } from "../services/cards";
import { postAudit } from "services/audits";

export const cardActions = cardSlice.actions;

export const fetchCards = createAsyncThunk("cards/fetchAllCards", async () => {
  const response = await getCards();
  return response;
});

export const changeCardStatus = createAsyncThunk(
  "cards/changeCardStatus",
  async ({ card, audit }: { card: Card; audit: Omit<Audit, "id"> }) => {
    try {
      const cardResponse = await putCard(card);
      const auditResponse = await postAudit(audit);
      return { card: cardResponse, audit: auditResponse };
    } catch (error) {
      throw new Error("Failed to fetch data");
    }
  }
);
