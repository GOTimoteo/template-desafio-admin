interface User {
  id: number;
  name: string;
  document: number;
  email: string;
  BirthDate: string;
  createdAt: string;
  updatedAt?: string;
  enabledFeatures: Feature["id"][];
  metadatas: {
    validDocument: boolean;
    verified: boolean;
  };
  address: {
    streetNumber: number;
    city: string;
    state: string;
    neighborhood: string;
    postalCode: string;
  };
  salaryBase: number;
}
