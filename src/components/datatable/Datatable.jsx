import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import {db} from "../../firebase"
const Datatable = () => {
  const [data, setData] = useState([]);

  useEffect(()=>{
    const fetchData =async()=>{
      let list =[];
      try{
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          list.push({id:doc.id,...doc.data()});
        });
        setData(list);
      }catch(e){
        console.log(e);
      }
      
    }
    fetchData();
  },[])

  const handleDelete = async (id) => {
    console.log(id)
    await deleteDoc(doc(db,"users",id))
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={6}
        rowsPerPageOptions={[6]}
        // checkboxSelection
      />
    </div>
  );
};

export default Datatable;
