import { describe, expect, test, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import DataTableFilter from "./DataTableFilter";

describe("<DataTableFilter/>", () => {
  const onChangeOfFilterMock = vi.fn();
  test("renders correctly", () => {
    render(<DataTableFilter onChangeOfFilter={onChangeOfFilterMock} />);

    const labelElement = screen.getByTestId("filter-label");
    const filterInput = screen.getByTestId("filter");

    expect(labelElement).toBeDefined();
    expect(filterInput).toBeDefined();
  });
  test("updates the filter value on input change", () => {
    render(<DataTableFilter onChangeOfFilter={onChangeOfFilterMock} />);

    const filterInput = screen.getByTestId("filter");
    fireEvent.change(filterInput, { target: { value: "example" } });

    expect(filterInput.value).toBe("example");
    expect(onChangeOfFilterMock).toHaveBeenCalledWith("example");
  });
});
