/**
 * React Component for rendering the header row of a DataTable with sortable columns.
 *
 * This component displays the header row of a DataTable with sortable columns. It receives an array of `columns` that defines the structure and appearance of the table columns.
 * The `onChangeOfSort` prop is a callback function that handles column sorting when a column header is clicked.
 * The `sortDirection` prop indicates the current sorting direction of the active column.
 * The `color` prop specifies the background color of the header row.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.columns - An array of objects representing the configuration of the columns in the DataTable.
 * @param {function} props.onChangeOfSort - A function that is called when a column header is clicked for sorting. The clicked column's unique identifier is passed as an argument.
 * @param {string} props.sortDirection - The current sorting direction of the active column. Should be either "ascending" or "descending".
 * @param {string} props.color - The background color of the header row in valid CSS format.
 * @returns {JSX.Element} The DataTableHeaderRow component.
 */
import { useState } from "react";
import PropTypes from "prop-types";
import { BsFillCaretUpFill, BsFillCaretDownFill } from "react-icons/bs";

export default function DataTableHeaderRow({
  columns,
  onChangeOfSort,
  sortDirection,
  color,
}) {
  const [selectedKey, setSelectedKey] = useState("id");

  /**
   * Handles the click event on a column header for sorting.
   * Calls the parent component's `onChangeOfSort` function to perform column sorting based on the clicked column's selector.
   *
   * @param {Event} e - The click event object.
   * @returns {void}
   * @inner
   */
  function handleClick(e) {
    setSelectedKey(e.target.id);
    onChangeOfSort(e.target.id);
  }

  return (
    <thead>
      <tr>
        {columns.map((column) => {
          return (
            <th
              className={`data-table-row-header border border-black bg-[${color}] text-white py-2 cursor-pointer`}
              id={column.selector}
              key={column.selector}
              onClick={handleClick}
            >
              {column.name}
              {column.selector === selectedKey ? (
                sortDirection === "ascending" ? (
                  <BsFillCaretUpFill className="sort-order inline-block ml-1" />
                ) : (
                  <BsFillCaretDownFill className="sort-order inline-block ml-1" />
                )
              ) : (
                ""
              )}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

DataTableHeaderRow.propTypes = {
  /**
   * An array of objects representing the configuration of the columns in the DataTable.
   * Each object should have properties 'name' (display name) and 'selector' (unique identifier).
   */
  columns: PropTypes.array.isRequired,

  /**
   * A callback function that is called when a column header is clicked for sorting.
   * @param {string} columnSelector - The unique identifier of the clicked column.
   */
  onChangeOfSort: PropTypes.func.isRequired,

  /**
   * The current sorting direction of the active column.
   * Should be either "ascending" or "descending".
   */
  sortDirection: PropTypes.oneOf(["ascending", "descending"]).isRequired,

  /**
   * The background color of the header row in valid CSS format.
   */
  color: PropTypes.string.isRequired,
};
