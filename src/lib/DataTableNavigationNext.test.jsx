import { describe, expect, test, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import DataTableNavigationNext from "./DataTableNavigationNext";

describe("<DataTableNavigationNext/>", () => {
  const mockOnClick = vi.fn();
  test("renders correctly", () => {
    render(<DataTableNavigationNext onClick={mockOnClick} />);

    const buttonElement = screen.getByTestId("data-table-navigation-next");
    expect(buttonElement).toBeDefined();
  });
  test("calls onClick when button is clicked", () => {
    render(<DataTableNavigationNext onClick={mockOnClick} />);

    const buttonElement = screen.getByTestId("data-table-navigation-next");
    fireEvent.click(buttonElement);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
  test("changes style on hover", () => {
    render(<DataTableNavigationNext onClick={mockOnClick} />);

    const buttonElement = screen.getByTestId("data-table-navigation-next");
    fireEvent.mouseOver(buttonElement);

    expect(buttonElement.getAttribute("class")).toMatch("hover:shadow-md");
  });
});
