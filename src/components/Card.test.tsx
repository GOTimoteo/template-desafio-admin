import { fireEvent, screen } from "@testing-library/react";
import Card from "./Card";
import renderWithProvider from "utils/test/renderWithProvider";
import "@testing-library/jest-dom";

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

describe("Card Component", () => {
  test("renders card details", async () => {
    renderWithProvider(
      <Card
        card={mockCard}
        readOnly={false}
        onCreateCard={jest.fn()}
        onCardStatusChange={jest.fn()}
        onNameChange={jest.fn()}
        onDeleteCard={jest.fn()}
      />
    );
    expect(screen.getByText(/ID:/i)).toBeInTheDocument();
    expect(screen.getByText("1234")).toBeInTheDocument();
  });

  test("displays and handles the name change input", async () => {
    renderWithProvider(
      <Card
        card={mockCard}
        readOnly={false}
        onCreateCard={jest.fn()}
        onCardStatusChange={jest.fn()}
        onNameChange={jest.fn()}
        onDeleteCard={jest.fn()}
      />
    );

    const nameInput = screen.getByDisplayValue("Test Card Display Name");
    expect(
      screen.getByDisplayValue("Test Card Display Name")
    ).toBeInTheDocument();

    expect(
      screen.getByDisplayValue("Test Card Display Name")
    ).toBeInTheDocument();

    fireEvent.change(nameInput, {
      target: { value: "New Test Card Display Name" },
    });
    expect(
      screen.getByDisplayValue("New Test Card Display Name")
    ).toBeInTheDocument();
  });
});
