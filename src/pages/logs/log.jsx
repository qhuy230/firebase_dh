import "./log.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Table from "../../components/table/Table";
import Navbar from "../../components/navbar/Navbar";

const Log = () => {
  return (
    <div className="log">
      <Sidebar />
      <div className="logHeader">
        <Navbar />
        <div className="logContainer">
            <div className="logTitle">Latest Result</div>
            <Table />
        </div>
      </div>
    </div>
  );
};

export default Log;
