import { describe, expect, test } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import DataTable from "./index";

describe("<DataTable/>", () => {
  const columns = [
    { name: "First Name", selector: "firstName" },
    { name: "Last Name", selector: "lastName" },
  ];
  const data = [
    { id: 1, firstName: "John", lastName: "Doe" },
    { id: 2, firstName: "Alice", lastName: "Johnson" },
    { id: 3, firstName: "Bob", lastName: "Brown" },
    { id: 4, firstName: "Eve", lastName: "Evans" },
    { id: 5, firstName: "Charlie", lastName: "Chaplin" },
    { id: 6, firstName: "David", lastName: "Davis" },
    { id: 7, firstName: "Fiona", lastName: "Ford" },
    { id: 8, firstName: "Grace", lastName: "Gray" },
    { id: 9, firstName: "Jane", lastName: "Smith" },
    { id: 10, firstName: "Henry", lastName: "Hill" },
    { id: 11, firstName: "Ivy", lastName: "Irwin" },
    { id: 12, firstName: "Ivy", lastName: "Winters" },
  ];

  test("renders correctly", () => {
    render(<DataTable columns={columns} data={data} />);

    const dataTableElement = screen.getByTestId("data-table");
    expect(dataTableElement).toBeDefined();
  });
  test("filters data based on input", () => {
    render(<DataTable columns={columns} data={data} />);

    const filterInput = screen.getByTestId("filter");
    fireEvent.change(filterInput, { target: { value: "John" } });

    const filteredRow = screen.getByText("John");
    expect(filteredRow).toBeDefined();

    const unfilteredRow = screen.queryByText("Jane");
    expect(unfilteredRow).toBeNull();
  });
  test("shows no result after filtering", () => {
    render(<DataTable columns={columns} data={data} />);

    const filterInput = screen.getByTestId("filter");
    fireEvent.change(filterInput, { target: { value: "Monica" } });

    const filteredRow = screen.getByText("No data available in table");
    expect(filteredRow).toBeDefined();
  });
  test("sorts data based on column header click", () => {
    render(<DataTable columns={columns} data={data} />);

    const columnHeaders = screen.getAllByRole("columnheader");
    const firstNameHeader = columnHeaders[0];
    fireEvent.click(firstNameHeader);

    const sortedRows = screen.getAllByTestId("data-table-row");
    expect(sortedRows[0].firstChild.innerHTML).toBe("Alice");
    expect(sortedRows[1].firstChild.innerHTML).toBe("Bob");
  });
  test("sorts data by descending", () => {
    render(<DataTable columns={columns} data={data} />);

    const columnHeaders = screen.getAllByRole("columnheader");
    const firstNameHeader = columnHeaders[0];
    fireEvent.click(firstNameHeader);
    fireEvent.click(firstNameHeader);

    const sortedRows = screen.getAllByTestId("data-table-row");
    expect(sortedRows[0].firstChild.innerHTML).toBe("John");
    expect(sortedRows[1].firstChild.innerHTML).toBe("Jane");
  });
  test("paginates data correctly", () => {
    render(<DataTable columns={columns} data={data} />);

    const numberOfEntriesDropdown = screen.getByTestId("entries");
    fireEvent.change(numberOfEntriesDropdown, { target: { value: 10 } });

    const visibleRows = screen.getAllByTestId("data-table-row");
    expect(visibleRows).toHaveLength(10);
  });
  test('clicks on "Previous" and "Next" buttons for pagination', () => {
    render(<DataTable columns={columns} data={data} />);

    const numberOfEntriesDropdown = screen.getByTestId("entries");
    fireEvent.change(numberOfEntriesDropdown, { target: { value: 10 } });

    const nextButton = screen.getByTestId("data-table-navigation-next");
    fireEvent.click(nextButton);

    const visibleRowsAfterNext = screen.getAllByTestId("data-table-row");
    expect(visibleRowsAfterNext).toHaveLength(2);
    expect(visibleRowsAfterNext[0].firstChild.innerHTML).toBe("Ivy");

    const previousButton = screen.getByTestId("data-table-navigation-previous");
    fireEvent.click(previousButton);

    const visibleRowsAfterPrevious = screen.getAllByTestId("data-table-row");
    expect(visibleRowsAfterPrevious).toHaveLength(10);
    expect(visibleRowsAfterPrevious[0].firstChild.innerHTML).toBe("John");
  });
  test('clicks on "Previous" on first page', () => {
    render(<DataTable columns={columns} data={data} />);

    const numberOfEntriesDropdown = screen.getByTestId("entries");
    fireEvent.change(numberOfEntriesDropdown, { target: { value: 10 } });

    const previousButton = screen.getByTestId("data-table-navigation-previous");
    fireEvent.click(previousButton);

    const visibleRowsAfterPrevious = screen.getAllByTestId("data-table-row");
    expect(visibleRowsAfterPrevious).toHaveLength(10);
    expect(visibleRowsAfterPrevious[0].firstChild.innerHTML).toBe("John");
  });
  test('clicks on "Next" on last page', () => {
    render(<DataTable columns={columns} data={data} />);

    const numberOfEntriesDropdown = screen.getByTestId("entries");
    fireEvent.change(numberOfEntriesDropdown, { target: { value: 15 } });

    const nextButton = screen.getByTestId("data-table-navigation-next");
    fireEvent.click(nextButton);

    const visibleRowsAfterNext = screen.getAllByTestId("data-table-row");
    expect(visibleRowsAfterNext).toHaveLength(12);
    expect(visibleRowsAfterNext[0].firstChild.innerHTML).toBe("John");
  });
});
