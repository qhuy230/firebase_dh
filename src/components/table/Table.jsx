import "./table.scss";
import { useContext} from "react";
import {DataResultImageContext} from "../../context/DataResultImageContext"
import { logColumns } from "../../datatablesource";
import { DataGrid } from "@mui/x-data-grid";

const List = () => {
  var temp=useContext(DataResultImageContext).datas
  var data =[...temp]
  // console.log(data)
  var sortData =data.sort(
    (objA, objB) =>  {
      // console.log(objA)
      return objB.time_create.getTime()-objA.time_create.getTime()},
  );
  // console.log(sortData)
  return (
    <div className="table">
    <DataGrid
        className="datagrid"
        rows={sortData}
        columns={logColumns}
        pageSize={6}
        rowsPerPageOptions={[6]}
        // checkboxSelection
      />
      </div>
  );
};

export default List;
