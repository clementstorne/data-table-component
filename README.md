# DataTable Component Documentation

## Description

A customizable React component that renders a data table with sorting, filtering, and pagination features. This component allows you to display provided data using specified columns while providing options to customize colors for various elements.

## Dependencies

- node v.19.7.0
- react-icons: ^4.10.1
- tailwindcss: ^3.3.3

## Installation and Usage

To use the `DataTable` component in your React application, follow these steps:

1. Install the required dependencies. Make sure you have React and PropTypes installed in your project.

```bash
npm install data-table-component
```

2. Import and use the `DataTable` component in your application:

```jsx
import DataTable from "data-table-component";

const columns = [
  // An array of column objects with at least a 'key' and 'title' property.
  // Example: { key: 'id', title: 'ID' }
];

const data = [
  // An array of data objects, each containing properties corresponding to the 'key' in the columns array.
  // Example: { id: 1, firstName: 'John', lastName: 'Doe' }
];

function App() {
  return (
    <DataTable
      columns={columns}
      data={data}
      headerColor="#446404"
      rowColor="#eef1e6"
      alternateRowColor="#94ac1b"
      hoverRowColor="#687f11"
    />
  );
}
```

## Props

The `DataTable` component accepts the following props:

- `columns` (required): An array of column objects representing the columns to display in the table. Each object must have at least two properties: `key` (a unique identifier for the column) and `title` (the display name of the column).

- `data` (required): An array of data objects to be displayed in the table. Each object should contain properties corresponding to the `key` defined in the `columns` prop.

- `headerColor`: The header row color of the DataTable. Defaults to "#446404" (green).

- `rowColor`: The primary row color of the DataTable. Defaults to "#eef1e6" (light gray).

- `alternateRowColor`: The alternate row color of the DataTable. Defaults to "#94ac1b" (greenish).

- `hoverRowColor`: The hover row color of the DataTable. Defaults to "#687f11" (darker green).

## Functionality

The `DataTable` component provides the following functionality:

### Number of Entries per Page

Users can choose the number of entries to display per page. The available options are defined in the `numberOfEntriesOptions` array, which can be customized as needed.

### Pagination

The table displays a limited number of entries per page, and pagination buttons allow users to navigate through the different pages.

### Sorting

Clicking on the column headers triggers sorting of the table data. The table can be sorted in ascending or descending order based on the selected column.

### Filtering

Users can apply a text-based filter to the data. The filter works across all columns and displays the rows that match the filter text.

## Hooks

The `DataTable` component utilizes the React `useState` and `useEffect` hooks to manage state and perform side-effects, respectively.

## Custom Components

The `DataTable` component uses several custom sub-components for specific functionalities:

- `DataTableNumberOfEntries`: A component to select the number of entries per page.
- `DataTableFilter`: A component to input and apply the filter on the data.
- `DataTableHeaderRow`: A row component displaying the column headers and providing sorting functionality.
- `DataTableRow`: A row component to render individual data rows.
- `DataTablePagination`: A component displaying pagination information.
- `DataTableNavigationPrevious`: A component providing navigation to the previous page.
- `DataTableNavigationNext`: A component providing navigation to the next page.

## Example

```jsx
import React from "react";
import DataTable from "./DataTable";

const columns = [
  { key: "id", title: "ID" },
  { key: "firstName", title: "First Name" },
  { key: "lastName", title: "Last Name" },
];

const data = [
  { id: 1, firstName: "John", lastName: "Doe" },
  { id: 2, firstName: "Jane", lastName: "Smith" },
  // ...more data
];

function App() {
  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        headerColor="#446404"
        rowColor="#eef1e6"
        alternateRowColor="#94ac1b"
        hoverRowColor="#687f11"
      />
    </div>
  );
}

export default App;
```

## License

This component is open-source and licensed under the MIT License. You can use, modify, and distribute it freely as long as you retain the original license information.
