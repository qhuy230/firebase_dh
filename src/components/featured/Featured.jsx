import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useContext } from "react";
import { DataResultImageContext } from "../../context/DataResultImageContext";


const Featured = () => {
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Percentage of this month</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar
            value={parseInt(
              (useContext(DataResultImageContext).number_pass_result /
                useContext(DataResultImageContext).number_total_result) *
                100
            )}
            text={(parseInt(
              (useContext(DataResultImageContext).number_pass_result /
                useContext(DataResultImageContext).number_total_result) *
                100
            )).toString()+'%'}
            strokeWidth={5}
            size="10rem"
          />
    
        </div>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Total Results</div>
            <div className="itemResult positive">
              <div className="resultAmount">{useContext(DataResultImageContext).number_total_result}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Pass Results</div>
            <div className="itemResult positive">
              <div className="resultAmount">{useContext(DataResultImageContext).number_pass_result}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
