import instance from "./api";

export const postCard = (payload: Omit<Card, "id">) =>
  instance.post(`/cards`, payload).then(({ data }) => data);

export const getCards = () => instance.get("/cards").then(({ data }) => data);

export const putCard = (payload: Card) =>
  instance.put(`/cards/${payload.id}`, payload).then(({ data }) => data);

export const deleteCard = (cardId: Card["id"]) =>
  instance.delete(`/cards/${cardId}`).then(({ data }) => data);
