import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import DataTablePagination from "./DataTablePagination";

describe("<DataTablePagination/>", () => {
  test("renders correctly with basic props", () => {
    render(
      <DataTablePagination
        numberOfEntriesPerPage={10}
        firstEntryOfPage={1}
        totalEntries={100}
      />
    );

    const paginationLabelElement = screen.getByTestId(
      "data-table-pagination-label"
    );
    const paginationLabel = paginationLabelElement.innerHTML;
    expect(paginationLabelElement).toBeDefined();
    expect(paginationLabel).toBe("1-10 of 100");
  });
  test("renders '0 of 0' when totalEntries is 0", () => {
    render(
      <DataTablePagination
        numberOfEntriesPerPage={10}
        firstEntryOfPage={0}
        totalEntries={0}
      />
    );

    const paginationLabelElement = screen.getByTestId(
      "data-table-pagination-label"
    );
    const paginationLabel = paginationLabelElement.innerHTML;
    expect(paginationLabelElement).toBeDefined();
    expect(paginationLabel).toBe("0 of 0");
  });
  test("renders correctly when totalEntries is less than numberOfEntriesPerPage", () => {
    render(
      <DataTablePagination
        numberOfEntriesPerPage={10}
        firstEntryOfPage={1}
        totalEntries={8}
      />
    );

    const paginationLabelElement = screen.getByTestId(
      "data-table-pagination-label"
    );
    const paginationLabel = paginationLabelElement.innerHTML;
    expect(paginationLabelElement).toBeDefined();
    expect(paginationLabel).toBe("1-8 of 8");
  });
  test("renders 'Invalid range' when firstEntryOfPage is greater than totalEntries", () => {
    render(
      <DataTablePagination
        numberOfEntriesPerPage={10}
        firstEntryOfPage={110}
        totalEntries={100}
      />
    );

    const paginationLabelElement = screen.getByTestId(
      "data-table-pagination-label"
    );
    const invalidRangeMessage = paginationLabelElement.innerHTML;
    expect(paginationLabelElement).toBeDefined();
    expect(invalidRangeMessage).toBe("Invalid range");
  });
  test("renders correctly when last entry exceeds totalEntries", () => {
    render(
      <DataTablePagination
        numberOfEntriesPerPage={10}
        firstEntryOfPage={91}
        totalEntries={100}
      />
    );

    const paginationLabelElement = screen.getByTestId(
      "data-table-pagination-label"
    );
    const paginationLabel = paginationLabelElement.innerHTML;
    expect(paginationLabelElement).toBeDefined();
    expect(paginationLabel).toBe("91-100 of 100");
  });
  test("renders correctly when there is only one entry", () => {
    render(
      <DataTablePagination
        numberOfEntriesPerPage={10}
        firstEntryOfPage={1}
        totalEntries={1}
      />
    );

    const paginationLabelElement = screen.getByTestId(
      "data-table-pagination-label"
    );
    const paginationLabel = paginationLabelElement.innerHTML;
    expect(paginationLabelElement).toBeDefined();
    expect(paginationLabel).toBe("1-1 of 1");
  });
});
