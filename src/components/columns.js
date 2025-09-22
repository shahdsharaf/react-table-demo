export const COLUMNS = [
  {
    header: "Id",
    footer: "Id",
    accessorKey: "id",
    enableColumnFilter: false, // ❌ no filter input
  },
  {
    header: "First Name",
    footer: "First Name",
    accessorKey: "first_name",
  },
  {
    header: "Last Name",
    footer: "Last Name",
    accessorKey: "last_name",
  },
  {
    header: "Date of Birth",
    footer: "Date of Birth",
    accessorKey: "date_of_birth",
    // Cell: ({ value }) => {
    //   return format(new Date(value), "dd/mm/yyyy");
    // },
  },
  {
    header: "Phone",
    footer: "Phone",
    accessorKey: "phone",
  },
  {
    header: "Country",
    footer: "Country",
    accessorKey: "country",
  },
];

export const GROUPED_COLUMNS = [
  {
    header: "Id",
    footer: "Id",
    accessorKey: "id",
  },
  {
    header: "Name",
    footer: "Name",
    columns: [
      {
        header: "First Name",
        footer: "First Name",
        accessorKey: "first_name",
      },
      {
        header: "Last Name",
        footer: "Last Name",
        accessorKey: "last_name",
      },
    ],
  },

  {
    header: "Info",
    footer: "Info",
    columns: [
      {
        header: "Date of Birth",
        footer: "Date of Birth",
        accessorKey: "date_of_birth",
      },
      {
        header: "Phone",
        footer: "Phone",
        accessorKey: "phone",
      },
      {
        header: "Country",
        footer: "Country",
        accessorKey: "country",
      },
    ],
  },
];
