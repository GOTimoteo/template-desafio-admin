import instance from "./api";

export const getAudits = () => instance.get("/audits").then(({ data }) => data);

export const postAudit = (payload: Omit<Audit, "id">) =>
  instance.post(`/audits`, payload).then(({ data }) => data);
