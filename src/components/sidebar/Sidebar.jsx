import "./sidebar.scss";
// import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import SourceIcon from '@mui/icons-material/Source';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const navitage = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(DarkModeContext);
  const [dataUser,setDataUser]=useState({
    avatar: "https://firebasestorage.googleapis.com/v0/b/demorealtime-d1e78.appspot.com/o/AvatarUser%2Fuser.png?alt=media&token=24f0f20e-9ab3-4647-8b97-e0c2fc33503a",
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
        authe.position !== undefined 
        &&authe.position.toUpperCase() === "ADMIN"
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

  useEffect(()=>{
    const data = JSON.parse(localStorage.getItem('data_user'));
    setDataUser(data)
    if(RequireAuthe()==0)
      document.getElementsByClassName('userLink')[0].style.display = "block";

  },[])

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Hi, { dataUser.fullName}</span>
        </Link>
      </div>
      <div className="center">
        <ul>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <HomeIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <Link to="/users" style={{ textDecoration: "none",display:"none"}} className="userLink">
            <li>
              <PeopleAltIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/Log" style={{ textDecoration: "none" }}>
            <li>
              <SourceIcon className="icon" />
              <span>Logs</span>
            </li>
          </Link>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li>
          <Link to="/Single" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>
          <li onClick={logout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
