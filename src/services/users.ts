import instance from "./api";

export const getUsers = () => instance.get("/users").then(({ data }) => data);
