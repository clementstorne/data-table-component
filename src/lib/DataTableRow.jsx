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
import { useState } from "react";

export default function DataTableRow({ data, columns, rowColors, hoverColor }) {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <tr
      className={`data-table-row border border-black hover:${hoverColor}`}
      style={{ backgroundColor: isHover ? hoverColor : rowColors }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-testid="data-table-row"
    >
      {columns.map((column) => {
        return (
          <td
            className="data-table-row-cell border border-black py-2"
            data-testid="data-table-row-cell"
            key={column.selector}
          >
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
  rowColors: PropTypes.string,

  /**
   * A string specifying the CSS class for the row's hover color.
   */
  hoverColor: PropTypes.string,
};
