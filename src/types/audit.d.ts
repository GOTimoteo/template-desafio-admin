interface Audit {
  id: string;
  createdAt: string;
  type: string;
  before?: Card;
  after?: Card;
  requestedBy: Analyst["id"];
}
