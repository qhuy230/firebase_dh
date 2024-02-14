import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useEffect, useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const Widget = ({ type }) => {
  let data;

  const [amount, setAmount] = useState(null);
  const [statusOverall, setStatusOverall] = useState("");
  const [statusMotor, setStatusMotor] = useState("");
  const [statusCamera, setStatusCamera] = useState("");

  useEffect(() => {
    // get amount and status
    const fetchData = async () => {
      //get amount
      const userQuery = query(collection(db, "users"));
      const userData = await getDocs(userQuery);
      setAmount(userData.docs.length);

      //get status
      const querySnapshot = await getDocs(collection(db, "Actuators"));
      querySnapshot.forEach((doc) => {
        var actuator = doc.data();
        if (actuator.Camera === "DETECT") setStatusCamera("DETECT");
        else setStatusCamera("NO DETECT");

        if (actuator.Motor === "RUNNING") setStatusMotor("RUNNING");
        else setStatusMotor("NO DETECT");

        if (actuator.Camera === "DETECT" || actuator.Pitong === "RUNNING")
          setStatusOverall("RUNNING");
        else setStatusOverall("STOP");
      });
    };
    fetchData();
  }, []);

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        // link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "status_Motor":
      data = {
        title: "MOTOR",
        isMoney: false,
        // link: "View all orders",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "status_Camera":
      data = {
        title: "CAMERA",
        isMoney: true,
        // link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "status_overall":
      data = {
        title: "STATUS",
        isMoney: true,
        // link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {/* {data.isMoney && "$"}  */}
          {data.title === "STATUS"
            ? statusOverall
            : data.title === "CAMERA"
            ? statusCamera
            : data.title === "MOTOR"
            ? statusMotor
            : amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {/* {diff} %   */}
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
