import { useTranslation } from "react-i18next";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./setting.scss";

const Setting = () => {
  const [t, i18n] = useTranslation("global");

  const handleLanguage = () => {
    i18n.changeLanguage(document.getElementById("languages").value);
  };

  return (
    <div className="setting">
      <Sidebar />
      <div className="settingHeader">
        <Navbar />
        <div className="logContainer">
          <form>
            <label for="cars">Site Language: </label>
            <select
              name="languages"
              id="languages"
              onChange={handleLanguage}
              value={i18n.language}
            >
              <option value="en">English</option>
              <option value="vi">Vietnamese</option>
            </select>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Setting;
