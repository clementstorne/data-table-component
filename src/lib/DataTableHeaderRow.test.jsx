import { describe, expect, test, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import DataTableHeaderRow from "./DataTableHeaderRow";

describe("<DataTableHeaderRow/>", () => {
  const columns = [
    { name: "Name", selector: "name" },
    { name: "Age", selector: "age" },
    { name: "Country", selector: "country" },
  ];

  const onChangeOfSortMock = vi.fn();

  test("renders correctly", () => {
    render(
      <DataTableHeaderRow
        columns={columns}
        onChangeOfSort={onChangeOfSortMock}
        sortDirection="ascending"
        color="blue"
      />
    );

    const columnHeaders = screen.getAllByRole("columnheader");
    expect(columnHeaders).toHaveLength(columns.length);
    columns.forEach((column, index) => {
      expect(columnHeaders[index].innerHTML).toBe(column.name);
    });
  });
  test("calls onChangeOfSort when column header is clicked", () => {
    render(
      <DataTableHeaderRow
        columns={columns}
        onChangeOfSort={onChangeOfSortMock}
        sortDirection="ascending"
        color="blue"
      />
    );

    const columnHeader = screen.getByText("Name");
    fireEvent.click(columnHeader);

    expect(onChangeOfSortMock).toHaveBeenCalledTimes(1);
    expect(onChangeOfSortMock).toHaveBeenCalledWith("name");
  });
  test("displays ascending sort icon when selectedKey matches column selector and sortDirection is ascending", () => {
    render(
      <DataTableHeaderRow
        columns={columns}
        onChangeOfSort={onChangeOfSortMock}
        sortDirection="ascending"
        color="blue"
      />
    );

    const columnHeader = screen.getByText("Name");
    fireEvent.click(columnHeader);

    const sortIcon = screen.getByTestId("sort-icon-ascending");
    expect(sortIcon).toBeDefined();
    expect(sortIcon.getAttribute("class")).toMatch("sort-order");
  });
  test("displays descending sort icon when selectedKey matches column selector and sortDirection is descending", () => {
    render(
      <DataTableHeaderRow
        columns={columns}
        onChangeOfSort={onChangeOfSortMock}
        sortDirection="descending"
        color="blue"
      />
    );

    const columnHeader = screen.getByText("Name");
    fireEvent.click(columnHeader);

    const sortIcon = screen.getByTestId("sort-icon-descending");
    expect(sortIcon).toBeDefined();
    expect(sortIcon.getAttribute("class")).toMatch("sort-order");
  });
});
