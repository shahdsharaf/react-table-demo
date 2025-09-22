import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import MOCK_DATA from "./mock_data.json";
import { COLUMNS } from "./columns";
import "./table.css";

export const ColumnHiding = () => {
  const data = useMemo(() => MOCK_DATA, []);
  const columns = useMemo(() => COLUMNS, []);

  // ✅ Keep track of hidden/visible columns
  const [columnVisibility, setColumnVisibility] = useState({});

  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility, // tell table about our visibility state
    },
    onColumnVisibilityChange: setColumnVisibility, // handler
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      {/* ✅ Column toggle checkboxes */}
      <div style={{ marginBottom: "10px" }}>
        {/* Toggle All */}
        <label>
          <input
            type="checkbox"
            // ✅ checked when ALL columns are hidden
            checked={table
              .getAllLeafColumns()
              .every((col) => !col.getIsVisible())}
            // ✅ indeterminate when SOME are hidden
            ref={(el) => {
              if (!el) return;
              const all = table.getAllLeafColumns();
              el.indeterminate =
                all.some((col) => !col.getIsVisible()) &&
                !all.every((col) => !col.getIsVisible());
            }}
            onChange={(e) => table.toggleAllColumnsVisible(!e.target.checked)}
          />{" "}
          Toggle All
        </label>

        {/* Individual column toggles */}
        {table.getAllLeafColumns().map((column) => (
          <label key={column.id} style={{ marginLeft: "10px" }}>
            <input
              type="checkbox"
              // ✅ reverse logic: checked means HIDDEN
              checked={!column.getIsVisible()}
              onChange={(e) => column.toggleVisibility(!e.target.checked)}
            />{" "}
            {column.columnDef.header}
          </label>
        ))}
      </div>

      {/* ✅ The Table */}
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
