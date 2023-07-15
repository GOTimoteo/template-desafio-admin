import instance from "./api";

export const getCards = () => instance.get("/cards").then(({ data }) => data);

export const putCard = (payload: Card) =>
  instance.put(`/cards/${payload.id}`, payload).then(({ data }) => data);
