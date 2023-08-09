/**
 * React Component for rendering the "Next" navigation button in a DataTable.
 *
 * This component displays a button with a right-pointing caret icon, indicating the "Next" navigation action.
 * When clicked, it triggers the `onClick` event, which should be passed as a prop to handle the "Next" navigation logic.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {function} props.onClick - A function that is called when the "Next" button is clicked.
 * @returns {JSX.Element} The DataTableNavigationNext component.
 */
import PropTypes from "prop-types";
import { BsFillCaretRightFill } from "react-icons/bs";

export default function DataTableNavigationNext({ onClick }) {
  /**
   * Handles the click event on the "Next" navigation button.
   * Calls the parent component's `onClick` function to perform the "Next" navigation action.
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
      <BsFillCaretRightFill />
    </button>
  );
}

DataTableNavigationNext.propTypes = {
  /**
   * Callback function that is called when the "Next" button is clicked.
   */
  onClick: PropTypes.func.isRequired,
};
