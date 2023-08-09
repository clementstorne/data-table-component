/**
 * React Component for rendering a row in a DataTable with customizable colors.
 *
 * This component renders a row in a DataTable based on the provided data and column configuration.
 * It supports custom row and hover colors, allowing visual customization of individual rows.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.data - The data object representing the row's data.
 * @param {Array} props.columns - An array of column objects representing the configuration of the columns in the DataTable.
 * @param {string} props.rowColors - A string specifying the CSS classes for custom row colors.
 * @param {string} props.hoverColor - A string specifying the CSS class for the row's hover color.
 * @returns {JSX.Element} The DataTableRow component.
 */
import PropTypes from "prop-types";

export default function DataTableRow({ data, columns, rowColors, hoverColor }) {
  return (
    <tr className={`border border-black hover:${hoverColor} ${rowColors}`}>
      {columns.map((column) => {
        return (
          <td className="border border-black py-2" key={column.selector}>
            {data[column.selector]}
          </td>
        );
      })}
    </tr>
  );
}

DataTableRow.propTypes = {
  /**
   * The data object representing the row's data.
   */
  data: PropTypes.object.isRequired,

  /**
   * An array of column objects representing the configuration of the columns in the DataTable.
   * Each object should have properties 'name' (display name) and 'selector' (unique identifier).
   */
  columns: PropTypes.array.isRequired,

  /**
   * A string specifying the CSS classes for custom row colors.
   */
  rowColors: PropTypes.string.isRequired,

  /**
   * A string specifying the CSS class for the row's hover color.
   */
  hoverColor: PropTypes.string.isRequired,
};
