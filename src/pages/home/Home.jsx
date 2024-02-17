import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
;


const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const [auth_style,set_auth_styple]= useState("none")
  const RequireAuthe = () => {
    const authe = JSON.parse(localStorage.getItem("data_user"));
    if (currentUser) {
      if (
        authe.position !== undefined &&
        authe.position.toUpperCase() === "ADMIN"
      ) {
        return 0;
      } else {
        return -1;
      }
    } else return -1;
  };
  useEffect(() => {
    if (RequireAuthe() == 0)
      set_auth_styple("")
  }, []);
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" display_parent={auth_style}/>
          <Widget type="status_Motor" />
          <Widget type="status_Camera" />
          <Widget type="status_overall" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Detail Each Month" aspect={2 /   1} />
        </div>
        {/* <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div> */}
      </div>
    </div>
  );
};

export default Home;
