import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { AuthContext } from "contexts/auth";
import { Provider } from "react-redux";
import analystSlice from "slices/analystSlice";
import cardSlice from "slices/cardSlice";
import featureSlice from "slices/featureSlice";
import userSlice from "slices/userSlice";

const mockCard: Card = {
  id: 1,
  user_id: 123,
  status: "requested",
  metadatas: {
    name: "Test Card Display Name",
    digits: 1234,
    limit: 1000,
  },
  createdAt: "2023-07-20T12:34:56Z",
  updatedAt: "2023-07-20T12:34:56Z",
};

const mockAnalyst: Analyst = {
  id: 1001,
  user_id: "user123",
  email: "test@example.com",
  password: "password123",
  roles: ["n1", "n2"],
};

const mockFeature: Feature = {
  id: 1,
  name: "credit",
};

const mockUser: User = {
  id: 123,
  name: "John Doe",
  document: 1234567890,
  email: "john@example.com",
  BirthDate: "1990-01-01",
  createdAt: "2023-07-20T12:34:56Z",
  updatedAt: undefined,
  enabledFeatures: [1],
  metadatas: {
    validDocument: true,
    verified: false,
  },
  address: {
    streetNumber: 123,
    city: "New York",
    state: "NY",
    neighborhood: "Downtown",
    postalCode: "10001",
  },
  salaryBase: 50000,
};

function renderWithProvider(
  ui: React.ReactElement,
  {
    store = configureStore({
      middleware: undefined,
      reducer: {
        cards: cardSlice.reducer,
        analysts: analystSlice.reducer,
        users: userSlice.reducer,
        features: featureSlice.reducer,
      },
      preloadedState: {
        cards: {
          cards: [mockCard],
          status: "succeeded",
          error: undefined,
        },
        analysts: {
          loggedAnalyst: mockAnalyst,
          analysts: [mockAnalyst],
          status: "succeeded",
          error: undefined,
        },
        users: {
          users: [mockUser],
          status: "succeeded",
          error: undefined,
        },
        features: {
          features: [mockFeature],
          status: "succeeded",
          error: undefined,
        },
      },
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <AuthContext.Provider
        value={{
          analyst: mockAnalyst,
          logout: () => null,
          login: () => {
            return { isLogged: true, status: "" };
          },
        }}
      >
        <Provider store={store}>{children}</Provider>;
      </AuthContext.Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export default renderWithProvider;
