import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import MOCK_DATA from "./mock_data.json";
import { COLUMNS } from "./columns";
import "./table.css";

export const PaginationTable = () => {
  const data = useMemo(() => MOCK_DATA, []);
  const columns = useMemo(() => COLUMNS, []);

  // ✅ Pagination state
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // ✅ Local state for the input box
  const [pageInput, setPageInput] = useState(pagination.pageIndex + 1);

  const table = useReactTable({
    data,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
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
      </table>

      {/* Pagination Controls */}
      <div style={{ marginTop: "10px", display: "flex", gap: "5px" }}>
        <button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>

        <span>
          Page{" "}
          <strong>
            {pagination.pageIndex + 1} of {table.getPageCount()}
          </strong>
        </span>

        {/* Go to Page Input */}
        <div>
          | Go to page:{" "}
          <input
            type="number"
            min={1}
            max={table.getPageCount()}
            value={pageInput}
            onChange={(e) => setPageInput(e.target.value)} // ✅ free typing
            onBlur={() => {
              const page = Number(pageInput);
              if (!isNaN(page) && page >= 1 && page <= table.getPageCount()) {
                table.setPageIndex(page - 1);
              } else {
                // Reset to current if invalid
                setPageInput(pagination.pageIndex + 1);
              }
            }}
            style={{ width: "60px" }}
          />
        </div>

        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
      </div>

      {/* Page size dropdown */}
      <div style={{ marginTop: "10px" }}>
        <select
          value={pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
        >
          {[5, 10, 20, 50].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
