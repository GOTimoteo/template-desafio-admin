interface User {
  name: string;
  email: string;
  birthDate: string;
  createdAt: string;
  updatedAt: string;
  enabledFeatures: Feature["id"][];
  document: string;
  metadatas: {
    validDocument: string;
    verified: string;
  };
  address: string;
  salaryBase: string;
  id: number;
}
