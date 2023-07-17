import instance from "./api";

export const getAnalysts = () =>
  instance.get("/analysts").then(({ data }) => data);
