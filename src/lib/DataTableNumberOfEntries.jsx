/**
 * React Component for selecting the number of entries displayed per page in a DataTable.
 *
 * This component renders a dropdown select field allowing users to choose the number of entries to display per page in a DataTable.
 * The available options are provided through the `options` prop, and the current selection is controlled by the `numberOfEntries` state.
 * When the selection changes, the `onNumberOfEntriesChange` prop is called with the new value.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.options - An array of numbers representing the available options for the number of entries per page.
 * @param {function} props.onNumberOfEntriesChange - A function that is called when the number of entries per page is changed. The new value is passed as an argument to this function.
 * @returns {JSX.Element} The DataTableNumberOfEntries component.
 */
import { useState } from "react";
import PropTypes from "prop-types";

export default function DataTableNumberOfEntries({
  options,
  onNumberOfEntriesChange,
}) {
  const [numberOfEntries, setNumberOfEntries] = useState(options[0]);

  /**
   * Handles the change event of the select field for the number of entries per page.
   * Updates the `numberOfEntries` state and calls the parent component's `onNumberOfEntriesChange` function with the new value.
   *
   * @param {Event} e - The change event object.
   * @returns {void}
   * @inner
   */
  function handleChange(e) {
    const { value } = e.target;
    setNumberOfEntries(value);
    onNumberOfEntriesChange(value);
  }

  return (
    <div>
      <label
        htmlFor="entries"
        id="entries-label"
        data-testid="entries-label"
        className="number-of-entries-label font-semibold mr-1"
      >
        Rows per page:
      </label>
      <select
        name="entries"
        id="entries"
        data-testid="entries"
        className="number-of-entries-select px-3 py-1 rounded-md bg-white shadow hover:shadow-md"
        aria-describedby="entries-label"
        value={numberOfEntries}
        onChange={handleChange}
      >
        {options.map((option, index) => {
          return (
            <option value={option} key={index}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
}

DataTableNumberOfEntries.propTypes = {
  /**
   * An array of numbers representing the available options for the number of entries per page.
   */
  options: PropTypes.array.isRequired,

  /**
   * Callback function that is called when the number of entries per page is changed.
   * @param {number} newValue - The new value selected for the number of entries per page.
   */
  onNumberOfEntriesChange: PropTypes.func.isRequired,
};
