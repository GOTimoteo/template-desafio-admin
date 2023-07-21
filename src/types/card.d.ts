interface Card {
  createdAt: string;
  updatedAt?: string;
  status: "requested" | "approved" | "rejected";
  id: number;
  user_id: User["id"]; // TECH: As tipagens foram feitas utilizando lookup types para minimizar erros em futuras alterações dos tipos das propriedades de outras entidades.
  metadatas: {
    name: string;
    digits: number;
    limit: number;
  };
}
