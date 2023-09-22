/**
 * React Component for rendering a customizable DataTable with sorting, filtering, and pagination.
 *
 * This component creates a data table with features like sorting, filtering, and pagination.
 * It displays the provided data using the given columns and allows customization of colors.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.columns - An array of column objects representing the configuration of the columns in the DataTable.
 * @param {Array} props.data - An array of data objects to be displayed in the table.
 * @param {string} [props.headerColor="#444444"] - The header row color of the DataTable.
 * @param {string} [props.rowColor="#eef1e6"] - The primary row color of the DataTable.
 * @param {string} [props.alternateRowColor="#94ac1b"] - The alternate row color of the DataTable.
 * @param {string} [props.hoverRowColor="#687f11"] - The hover row color of the DataTable.
 * @returns {JSX.Element} The DataTable component.
 */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import DataTableNumberOfEntries from "./DataTableNumberOfEntries";
import DataTableFilter from "./DataTableFilter";
import DataTableHeaderRow from "./DataTableHeaderRow";
import DataTableRow from "./DataTableRow";
import DataTablePagination from "./DataTablePagination";
import DataTableNavigationPrevious from "./DataTableNavigationPrevious";
import DataTableNavigationNext from "./DataTableNavigationNext";

export default function DataTable({
  columns,
  data,
  headerColor,
  rowColor,
  alternateRowColor,
  hoverRowColor,
}) {
  const numberOfEntriesOptions = [10, 15, 20, 25, 30];

  const [numberOfEntries, setNumberOfEntries] = useState(
    numberOfEntriesOptions[0]
  );
  const [firstEntry, setFirstEntry] = useState(0);
  const lastEntry = firstEntry + numberOfEntries;
  const [entriesToShow, setEntriesToShow] = useState(
    data.slice(firstEntry, lastEntry)
  );

  const handleNumberOfEntriesChange = (number) => {
    setNumberOfEntries(parseInt(number));
    setFirstEntry(0);
  };

  const handleClickPrevious = () => {
    if (firstEntry - numberOfEntries < 0) {
      return;
    } else {
      setFirstEntry(firstEntry - numberOfEntries);
    }
  };

  const handleClickNext = () => {
    if (firstEntry + numberOfEntries > entriesToShow.length) {
      return;
    } else {
      setFirstEntry(firstEntry + numberOfEntries);
    }
  };

  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState(
    data.slice(firstEntry, lastEntry)
  );

  const handleChangeOfFilter = (string) => {
    setFilter(string);
  };

  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "ascending",
  });

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    const sortedData = () => {
      return [...data].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    };

    const sortedDataArray = sortedData();

    const filterFirstName = () => {
      return sortedDataArray.filter((item) => {
        return item.firstName.toLowerCase().includes(filter.toLowerCase());
      });
    };

    const filterLastName = () => {
      return sortedDataArray.filter((item) => {
        return item.lastName.toLowerCase().includes(filter.toLowerCase());
      });
    };

    const filterGlobal = () => {
      const result = filterFirstName().concat(filterLastName());
      return [...new Set(result)];
    };

    const filteredDataArray = filterGlobal();

    setFilteredData(filteredDataArray);

    setEntriesToShow(filteredDataArray.slice(firstEntry, lastEntry));
  }, [firstEntry, lastEntry, numberOfEntries, sortConfig, filter, data]);

  return (
    <>
      <div
        className="data-table-container flex flex-row flex-nowrap justify-between"
        data-testid="data-table-container"
      >
        <DataTableNumberOfEntries
          options={numberOfEntriesOptions}
          onNumberOfEntriesChange={handleNumberOfEntriesChange}
        />
        <DataTableFilter onChangeOfFilter={handleChangeOfFilter} />
      </div>
      <table
        className="data-table w-full my-3 table-auto border-collapse border border-black text-center"
        data-testid="data-table"
      >
        <DataTableHeaderRow
          columns={columns}
          onChangeOfSort={handleSort}
          sortDirection={sortConfig.direction}
          color={headerColor}
        />
        <tbody>
          {entriesToShow.length === 0 ? (
            <td colSpan={columns.length} className="one-column text-center">
              No data available in table
            </td>
          ) : (
            entriesToShow.map((row, index) => {
              return (
                <DataTableRow
                  data={row}
                  columns={columns}
                  key={row.id}
                  rowColors={index % 2 === 0 ? rowColor : alternateRowColor}
                  hoverColor={hoverRowColor}
                />
              );
            })
          )}
        </tbody>
      </table>
      <div className="data-table-pagination flex flex-row flex-nowrap justify-center items-center">
        <DataTableNavigationPrevious onClick={handleClickPrevious} />
        <DataTablePagination
          numberOfEntriesPerPage={numberOfEntries}
          firstEntryOfPage={firstEntry + 1}
          totalEntries={Math.min(filteredData.length, data.length)}
        />
        <DataTableNavigationNext onClick={handleClickNext} />
      </div>
    </>
  );
}

DataTable.propTypes = {
  /**
   * An array of column objects representing the configuration of the columns in the DataTable.
   * Each object should have properties 'name' (display name) and 'selector' (unique identifier).
   */
  columns: PropTypes.array.isRequired,

  /**
   * An array of data objects to be displayed in the table.
   * Each object should correspond to a row in the table and contain properties that match the column selectors.
   */
  data: PropTypes.array.isRequired,

  /**
   * The header row color of the DataTable.
   */
  headerColor: PropTypes.string,

  /**
   * The primary row color of the DataTable.
   */
  rowColor: PropTypes.string,

  /**
   * The alternate row color of the DataTable.
   */
  alternateRowColor: PropTypes.string,

  /**
   * The hover row color of the DataTable.
   */
  hoverRowColor: PropTypes.string,
};

/**
 * Default props for the DataTable component.
 */
DataTable.defaultProps = {
  headerColor: "#444444",
  rowColor: "#b0b0b0",
  alternateRowColor: "#e7e7e7",
  hoverRowColor: "#6d6d6d",
};
