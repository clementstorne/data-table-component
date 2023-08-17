/**
 * React Component for providing a search filter input in a DataTable.
 *
 * This component renders a search filter input field to allow users to filter data within a DataTable.
 * The `onChangeOfFilter` prop is a callback function that is invoked when the filter value changes.
 * It receives the current filter value as an argument.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {function} props.onChangeOfFilter - A function that is called when the filter value changes.
 * @returns {JSX.Element} The DataTableFilter component.
 */
import { useState } from "react";
import PropTypes from "prop-types";

export default function DataTableFilter({ onChangeOfFilter }) {
  const [filter, setFilter] = useState("");

  /**
   * Handles the change event of the filter input.
   * Updates the filter state and invokes the parent component's `onChangeOfFilter` function.
   *
   * @param {Event} e - The change event object.
   * @returns {void}
   * @inner
   */
  function handleChange(e) {
    const { value } = e.target;
    setFilter(value);
    onChangeOfFilter(value);
  }

  return (
    <div>
      <label
        htmlFor="filter"
        id="filter-label"
        data-testid="filter-label"
        className="filter-label font-semibold mr-1"
      >
        Search:
      </label>
      <input
        type="text"
        id="filter"
        data-testid="filter"
        aria-describedby="filter-label"
        spellCheck="false"
        className="filter-input px-3 py-1 rounded-md bg-white shadow hover:shadow-md focus:shadow-md"
        value={filter}
        onChange={handleChange}
      />
    </div>
  );
}

DataTableFilter.propTypes = {
  /**
   * A callback function that is called when the filter value changes.
   * @param {string} filterValue - The current value of the filter input.
   */
  onChangeOfFilter: PropTypes.func.isRequired,
};
