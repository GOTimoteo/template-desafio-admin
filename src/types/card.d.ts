interface Card {
  createdAt: string;
  updatedAt: string;
  status: string;
  id: string;
  user_id: User["id"];
  metadatas: {
    name: string;
    digits: string;
    limit: string;
  };
}
