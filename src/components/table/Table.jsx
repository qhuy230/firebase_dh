import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useContext} from "react";
import {DataResultImageContext} from "../../context/DataResultImageContext"
import { logColumns } from "../../datatablesource";
import { DataGrid } from "@mui/x-data-grid";

const List = () => {

  return (
    // <TableContainer component={Paper} className="table">
    //   <Table sx={{ minWidth: 650 }} aria-label="simple table">
    //     <TableHead>
    //       <TableRow>
    //         <TableCell className="tableCell">#</TableCell>
    //         <TableCell className="tableCell">Name</TableCell>
    //         <TableCell className="tableCell">Result</TableCell>
    //         <TableCell className="tableCell">Date</TableCell>
    //         <TableCell className="tableCell">Image Result</TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {useContext(DataResultImageContext).datas.map((row) => (
    //         <TableRow key={row.Id}>
    //           <TableCell className="tableCell">{row.count}</TableCell>
    //           <TableCell className="tableCell">
    //             {row.name === undefined ? "" : row.name}
    //           </TableCell>
    //           <TableCell className="tableCell">
    //             {row.result_handle == "1" ? "True" : "False"}
    //           </TableCell>
    //           <TableCell className="tableCell">
    //             {row.time_create === undefined ? "" : row.time_create}
    //           </TableCell>
    //           <TableCell className="tableCell">
    //             {row.image === undefined ? (
    //               <img src="" alt="image" className="image" />
    //             ) : (
    //               <img src={row.image} alt="image" className="image" />
    //             )}
    //           </TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>
    <div className="table">
    <DataGrid
        className="datagrid"
        rows={useContext(DataResultImageContext).datas}
        columns={logColumns}
        pageSize={6}
        rowsPerPageOptions={[6]}
        // checkboxSelection
      />
      </div>
  );
};

export default List;
