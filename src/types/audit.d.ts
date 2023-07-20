interface Audit {
  id: number;
  createdAt: string;
  type: string;
  before?: Card;
  after?: Card;
  requestedBy: Analyst["id"];
}
