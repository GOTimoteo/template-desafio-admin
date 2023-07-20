interface Card {
  createdAt: string;
  updatedAt?: string;
  status: "requested" | "approved" | "rejected";
  id: number;
  user_id: User["id"];
  metadatas: {
    name: string;
    digits: number;
    limit: number;
  };
}
