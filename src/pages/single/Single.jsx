import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect } from "react";
import { useState } from "react";

const Single = () => {
  const [data, setData] = useState({
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/demorealtime-d1e78.appspot.com/o/AvatarUser%2Fuser.png?alt=media&token=24f0f20e-9ab3-4647-8b97-e0c2fc33503a",
    fullName: "",
    email: "",
    userName: "",
    phone: "",
    address: "",
    position: "",
  });
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data_user"));
    if(data!=""){
      setData(data);
    }
  }, []);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img src={data.avatar} alt="" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">{data.fullName.toUpperCase()}</h1>
                <div className="detailItem">
                  <span className="itemKey">Username:</span>
                  <span className="itemValue">{data.userName}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{data.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{data.phone.toUpperCase()}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                    {data.address.toUpperCase()}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Position:</span>
                  <span className="itemValue">
                    {data.position.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div> */}
        </div>
        {/* <div className="bottom">
        <h1 className="title">Last Transactions</h1>
          <List/>
        </div> */}
      </div>
    </div>
  );
};

export default Single;
