import "./sidebar.scss";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SourceIcon from "@mui/icons-material/Source";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import HomeIcon from "@mui/icons-material/Home";
import { Link, useLocation } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const navitage = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(DarkModeContext);
  const location = useLocation();
  const [t,i18n]= useTranslation("global")

  const [dataUser, setDataUser] = useState({
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/demorealtime-d1e78.appspot.com/o/AvatarUser%2Fuser.png?alt=media&token=24f0f20e-9ab3-4647-8b97-e0c2fc33503a",
    fullName: "",
    email: "",
    phone: "",
    address: "",
    position: "",
  });

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

  const logout = () => {
    localStorage.clear();
    navitage("/login");
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data_user"));
    setDataUser(data);
    if (RequireAuthe() == 0)
      document.getElementsByClassName("userLink")[0].style.display = "";
  }, []);

  return (
    <div className="sidebar">
      <div className="top">
        {/* <span className="logo">{dataUser.fullName}</span> */}
      </div>
      <div className="center">
        <ul>
          <li
            id={location.pathname === "/" ? "active" : ""}
            onClick={() => {
              navitage("/");
            }}
          >
            <HomeIcon className="icon" />
            <span>{t("sidebar.Dashboard")}</span>
          </li>
          <li
            onClick={() => {
              navitage("/users");
            }}
            // style={{ textDecoration: "none", display: "none" }}
            className="userLink"
            id={location.pathname === "/users" || location.pathname === "/users/new" ? "active" : ""}
          >
            <PeopleAltIcon className="icon" />
            <span>{t("sidebar.Users")}</span>
          </li>
          <li
            id={location.pathname === "/Log" ? "active" : ""}
            onClick={() => {
              navitage("/Log");
            }}
          >
            <SourceIcon className="icon" />
            <span>{t("sidebar.Logs")}</span>
          </li >
          <li id={location.pathname === "/setting" ? "active" : ""}
            onClick={() => {
              navitage("/setting");
            }}>
            <SettingsIcon className="icon" />
            <span>{t("sidebar.Setting")}</span>
          </li>
          <li
            id={location.pathname === "/Single" ? "active" : ""}
            onClick={() => {
              navitage("/Single");
            }}
          >
            <AccountCircleOutlinedIcon className="icon" />
            <span>{t("sidebar.Profile")}</span>
          </li>
          <li onClick={logout}>
            <ExitToAppIcon className="icon" />
            {/* <span>Đăng Xuất</span> */}
            <span>{t("sidebar.Logout")}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
