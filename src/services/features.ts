import instance from "./api";

export const getFeatures = () =>
  instance.get("/features").then(({ data }) => data.result);
