/**
 * React Component for rendering the "Previous" navigation button in a DataTable.
 *
 * This component displays a button with a left-pointing caret icon, indicating the "Previous" navigation action.
 * When clicked, it triggers the `onClick` event, which should be passed as a prop to handle the "Previous" navigation logic.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {function} props.onClick - A function that is called when the "Previous" button is clicked.
 * @returns {JSX.Element} The DataTableNavigationPrevious component.
 */
import PropTypes from "prop-types";
import { BsFillCaretLeftFill } from "react-icons/bs";

export default function DataTableNavigationPrevious({ onClick }) {
  /**
   * Handles the click event on the "Previous" navigation button.
   * Calls the parent component's `onClick` function to perform the "Previous" navigation action.
   *
   * @param {Event} e - The click event object.
   * @returns {void}
   * @inner
   */
  function handleClick(e) {
    onClick();
  }

  return (
    <button
      className="data-table-navigation p-2 rounded-full bg-white cursor-pointer shadow hover:shadow-md"
      onClick={handleClick}
    >
      <BsFillCaretLeftFill />
    </button>
  );
}

DataTableNavigationPrevious.propTypes = {
  /**
   * Callback function that is called when the "Previous" button is clicked.
   */
  onClick: PropTypes.func.isRequired,
};
