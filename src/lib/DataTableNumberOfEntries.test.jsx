import { describe, expect, test, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import DataTableNumberOfEntries from "./DataTableNumberOfEntries";

describe("<DataTableNumberOfEntries/>", () => {
  const options = [10, 20, 50];
  const onNumberOfEntriesChange = vi.fn();
  test("renders component with initial state", () => {
    render(
      <DataTableNumberOfEntries
        options={options}
        onNumberOfEntriesChange={onNumberOfEntriesChange}
      />
    );

    const labelElement = screen.getByTestId("entries-label");
    const selectElement = screen.getByTestId("entries");
    const selectOptions = screen.getAllByRole("option");

    expect(labelElement).toBeDefined();
    expect(selectElement).toBeDefined();
    expect(selectOptions).toHaveLength(3);
  });
  test("updates state and calls callback on select change", () => {
    render(
      <DataTableNumberOfEntries
        options={options}
        onNumberOfEntriesChange={onNumberOfEntriesChange}
      />
    );

    const selectElement = screen.getByTestId("entries");
    fireEvent.change(selectElement, { target: { value: 20 } });

    expect(onNumberOfEntriesChange).toHaveBeenCalledWith("20");
  });
});
