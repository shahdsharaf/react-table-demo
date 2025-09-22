import { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import MOCK_DATA from "./mock_data.json";
import { COLUMNS } from "./columns";
import "./sticky.css";

export const StickyTable = () => {
  const data = useMemo(() => MOCK_DATA, []);
  const columns = useMemo(() => COLUMNS, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="table-container">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, i) => {
                const stickyClass =
                  i === 0
                    ? "sticky sticky-1"
                    : i === 1
                    ? "sticky sticky-2"
                    : i === 2
                    ? "sticky sticky-3"
                    : "";

                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className={stickyClass}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell, i) => {
                const stickyClass =
                  i === 0
                    ? "sticky sticky-1"
                    : i === 1
                    ? "sticky sticky-2"
                    : i === 2
                    ? "sticky sticky-3"
                    : "";

                return (
                  <td key={cell.id} className={stickyClass}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
