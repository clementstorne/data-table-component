import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import DataTableRow from "./DataTableRow";

describe("<DataTableRow/>", () => {
  const columns = [
    { name: "Name", selector: "name" },
    { name: "Age", selector: "age" },
  ];
  const rowColors = "custom-color";
  const hoverColor = "hover-color";

  test("renders correctly", () => {
    const data = { name: "Alice", age: 25 };

    render(
      <DataTableRow
        data={data}
        columns={columns}
        rowColors={rowColors}
        hoverColor={hoverColor}
      />
    );

    const row = screen.getByTestId("data-table-row");
    const cells = screen.getAllByTestId("data-table-row-cell");
    expect(row).toBeDefined();
    expect(cells).toBeDefined();
    expect(cells).toHaveLength(columns.length);
    cells.forEach((cell, index) => {
      expect(cell.innerHTML).toBe(data[columns[index].selector].toString());
    });
  });
  test("renders correct column data", () => {
    const data = { name: "Alice", age: 25 };

    const { getByText } = render(
      <DataTableRow
        data={data}
        columns={columns}
        rowColors={rowColors}
        hoverColor={hoverColor}
      />
    );

    expect(getByText("Alice")).toBeDefined();
    expect(getByText("25")).toBeDefined();
  });
});
