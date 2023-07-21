import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteCard, getCards, postCard, putCard } from "../services/cards";
import { postAudit } from "services/audits";

export const createCard = createAsyncThunk(
  "cards/createCard",
  async ({
    card,
    audit,
  }: {
    card: Omit<Card, "id">;
    audit: Omit<Audit, "id">;
  }) => {
    try {
      const cardResponse = await postCard(card);
      const auditResponse = await postAudit({ ...audit, after: cardResponse });
      return { card: cardResponse, audit: auditResponse };
    } catch (error) {
      throw new Error("Failed to fetch data");
    }
  }
);

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

export const removeCard = createAsyncThunk(
  "cards/removeCard",
  async ({ id, audit }: { id: Card["id"]; audit: Omit<Audit, "id"> }) => {
    const cardResponse = await deleteCard(id);
    const auditResponse = await postAudit(audit);
    return { card: cardResponse, audit: auditResponse };
  }
);
