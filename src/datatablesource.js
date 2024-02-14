export const userColumns = [
  { field: "id", headerName: "ID", minWidth: 200 },
  {
    field: "userName",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.avatar} alt="avatar" />
          {params.row.userName}
        </div>
      );
    },
    
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "position",
    headerName: "Position",
    width: 100,
  },
  {
    field: "address",
    headerName: "Address",
    width: 100,
  },
];

export const logColumns = [
  { field: "count", headerName: "#", Width: "100wh" },
  {
    field: "name",
    headerName: "Name",
    width: 230,    
  },
  {
    field: "result_handle",
    headerName: "Result",
    width: 230,
    renderCell: (params) => {
      return (
        <div>
          {params.row.result_handle == "1" ? "Pass" : "Not Pass"}
        </div>
      );
    },
  },

  {
    field: "time_create",
    headerName: "Date",
    width: 200,
  },
  {
    field: "imageResult",
    headerName: "Image Result",
    width: 100,
  },
];

