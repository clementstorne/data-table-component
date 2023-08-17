/**
 * React Component for rendering pagination information in a DataTable.
 *
 * This component displays the range of entries currently shown on the page and the total number of entries in the DataTable.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {number} props.numberOfEntriesPerPage - The number of entries displayed per page.
 * @param {number} props.firstEntryOfPage - The index of the first entry shown on the current page.
 * @param {number} props.totalEntries - The total number of entries in the DataTable.
 * @returns {JSX.Element} The DataTablePagination component.
 */
import PropTypes from "prop-types";

export default function DataTablePagination({
  numberOfEntriesPerPage,
  firstEntryOfPage,
  totalEntries,
}) {
  let content;

  if (firstEntryOfPage > totalEntries) {
    content = "Invalid range";
  } else if (totalEntries === 0) {
    content = "0 of 0";
  } else {
    const lastEntry = Math.min(
      firstEntryOfPage + numberOfEntriesPerPage - 1,
      totalEntries
    );
    content = `${firstEntryOfPage}-${lastEntry} of ${totalEntries}`;
  }

  return (
    <div
      data-testid="data-table-pagination-label"
      className="data-table-pagination-label font-bold mx-3"
    >
      {content}
    </div>
  );
}

DataTablePagination.propTypes = {
  /**
   * The number of entries displayed per page.
   */
  numberOfEntriesPerPage: PropTypes.number.isRequired,

  /**
   * The index of the first entry shown on the current page.
   */
  firstEntryOfPage: PropTypes.number.isRequired,

  /**
   * The total number of entries in the DataTable.
   */
  totalEntries: PropTypes.number.isRequired,
};
