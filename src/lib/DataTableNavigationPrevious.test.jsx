import { describe, expect, test, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import DataTableNavigationPrevious from "./DataTableNavigationPrevious";

describe("<DataTableNavigationPrevious/>", () => {
  const mockOnClick = vi.fn();
  test("renders correctly", () => {
    render(<DataTableNavigationPrevious onClick={mockOnClick} />);

    const buttonElement = screen.getByTestId("data-table-navigation-previous");
    expect(buttonElement).toBeDefined();
  });
  test("calls onClick when button is clicked", () => {
    render(<DataTableNavigationPrevious onClick={mockOnClick} />);

    const buttonElement = screen.getByTestId("data-table-navigation-previous");
    fireEvent.click(buttonElement);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
  test("changes style on hover", () => {
    render(<DataTableNavigationPrevious onClick={mockOnClick} />);

    const buttonElement = screen.getByTestId("data-table-navigation-previous");
    fireEvent.mouseOver(buttonElement);

    expect(buttonElement.getAttribute("class")).toMatch("hover:shadow-md");
  });
});
