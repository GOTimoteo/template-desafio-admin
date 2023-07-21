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
    // TECH: Essa notação permite o uso do type Card e Audit sem o id, que ainda será criado pelo backend.
    // É melhor do que criar novos tipos, pois deixa vinculado ao tipo principal e evita erros futuros.
  }) => {
    try {
      const cardResponse = await postCard(card);
      const auditResponse = await postAudit({ ...audit, after: cardResponse });
      // TECH: A ordem das chamadas faz com que uma auditoria não seja criada caso a chamada do card falhe.
      // Porém, caso a chamada de auditorias falhe, teremos uma ação executada em cards que não vai gerar auditoria.
      // O correto é o backend gerenciar as auditorias, pois é possível realizar transações em lotes com ambas as chamadas,
      // realizando rollback caso qualquer uma das duas falhe e garantindo a consistência do banco.

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
