import { render, screen } from "@testing-library/react";
import Modal from "../Modal";

describe("Modal tests", () => {
  test("render", () => {
    const message = "This is modal body.";

    render(<Modal>{message}</Modal>);

    expect(screen.getByText(message)).toBeInTheDocument();
  });
});
