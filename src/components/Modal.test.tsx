import { render, fireEvent, screen } from "@testing-library/react";
import Modal from "./Modal";
import "@testing-library/jest-dom";

describe("Modal Component", () => {
  test("renders correctly when isOpen is true", () => {
    const onClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={onClose}>
        <h2>Modal Content</h2>
      </Modal>
    );

    const modalContent = screen.getByText("Modal Content");
    expect(modalContent).toBeInTheDocument();

    const closeButton = screen.getByRole("button");
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalled();
  });

  test("does not render content when isOpen is false", () => {
    const onClose = jest.fn();
    render(
      <Modal isOpen={false} onClose={onClose}>
        <h2>Modal Content</h2>
      </Modal>
    );

    const modalContent = screen.queryByText("Modal Content");
    expect(modalContent).not.toBeInTheDocument();
  });
});
