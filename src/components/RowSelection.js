// import { useMemo, useState } from "react";
// import {
//   useReactTable,
//   getCoreRowModel,
//   flexRender,
// } from "@tanstack/react-table";
// import MOCK_DATA from "./mock_data.json";
// import { COLUMNS } from "./columns";
// import "./table.css";

// export const RowSelection = () => {
//   const data = useMemo(() => MOCK_DATA, []);
//   const columns = useMemo(
//     () => [
//       {
//         id: "select",
//         header: ({ table }) => (
//           <input
//             type="checkbox"
//             checked={table.getIsAllRowsSelected()}
//             indeterminate={table.getIsSomeRowsSelected() ? "true" : undefined}
//             onChange={table.getToggleAllRowsSelectedHandler()}
//           />
//         ),
//         cell: ({ row }) => (
//           <input
//             type="checkbox"
//             checked={row.getIsSelected()}
//             disabled={!row.getCanSelect()}
//             onChange={row.getToggleSelectedHandler()}
//           />
//         ),
//       },
//       ...COLUMNS, // your existing columns
//     ],
//     []
//   );

//   const [rowSelection, setRowSelection] = useState({});

//   const table = useReactTable({
//     data,
//     columns,
//     state: { rowSelection },
//     enableRowSelection: true, // ✅ enables row selection
//     onRowSelectionChange: setRowSelection,
//     getCoreRowModel: getCoreRowModel(),
//   });

//   return (
//     <div>
//       <table>
//         <thead>
//           {table.getHeaderGroups().map((headerGroup) => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map((header) => (
//                 <th key={header.id} colSpan={header.colSpan}>
//                   {header.isPlaceholder
//                     ? null
//                     : flexRender(
//                         header.column.columnDef.header,
//                         header.getContext()
//                       )}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>

//         <tbody>
//           {table.getRowModel().rows.map((row) => (
//             <tr key={row.id}>
//               {row.getVisibleCells().map((cell) => (
//                 <td key={cell.id}>
//                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>

//         <tfoot>
//           {table.getFooterGroups().map((footerGroup) => (
//             <tr key={footerGroup.id}>
//               {footerGroup.headers.map((header) => (
//                 <td key={header.id}>
//                   {header.isPlaceholder
//                     ? null
//                     : flexRender(
//                         header.column.columnDef.footer,
//                         header.getContext()
//                       )}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tfoot>
//       </table>

//       {/* ✅ Selected Rows Data */}
//       <div style={{ marginTop: "20px" }}>
//         <h3>Selected Rows</h3>
//         <pre>
//           {JSON.stringify(
//             table.getSelectedRowModel().flatRows.map((row) => row.original),
//             null,
//             2
//           )}
//         </pre>
//       </div>
//     </div>
//   );
// };

import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import MOCK_DATA from "./mock_data.json";
import { COLUMNS } from "./columns";
import "./table.css";

export const RowSelection = () => {
  // ✅ Slice data to first 10 rows
  const data = useMemo(() => MOCK_DATA.slice(0, 10), []);
  const columns = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected() ? "true" : undefined}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
      },
      ...COLUMNS,
    ],
    []
  );

  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    state: { rowSelection },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
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

      {/* ✅ Show selected rows */}
      <div style={{ marginTop: "20px" }}>
        <h3>Selected Rows</h3>
        <pre>
          {JSON.stringify(
            table.getSelectedRowModel().flatRows.map((row) => row.original),
            null,
            2
          )}
        </pre>
      </div>
    </div>
  );
};
