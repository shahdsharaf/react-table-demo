import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import MOCK_DATA from "./mock_data.json";
import { COLUMNS } from "./columns";
import "./table.css";

export const ColumnOrder = () => {
  const data = useMemo(() => MOCK_DATA, []);
  const columns = useMemo(() => COLUMNS, []);

  // Keep the original order (based on accessorKeys from COLUMNS)
  const originalOrder = useMemo(
    () => COLUMNS.map((col) => col.accessorKey),
    []
  );

  const [isReordered, setIsReordered] = useState(false);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleToggleOrder = () => {
    if (isReordered) {
      // Reset to original order
      table.setColumnOrder(originalOrder);
    } else {
      // Example: move "country" to the front, keep others after
      table.setColumnOrder([
        "id",
        "country",
        "first_name",
        "last_name",
        "date_of_birth",
        "phone",
      ]);
    }
    setIsReordered(!isReordered);
  };

  return (
    <div>
      <button onClick={handleToggleOrder} style={{ marginBottom: "10px" }}>
        {isReordered ? "Reset to Default Order" : "Move Country First"}
      </button>

      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <td key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
};
