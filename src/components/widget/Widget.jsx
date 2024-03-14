import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const Widget = ({ type,data,display_parent }) => {
  return (
    <div className="widget" style={{display: display_parent}}>
      <div className="left">
        <span className="title">{type}</span>
        <span className="counter">
          {data}
        </span>
        {/* <span className="link">{data.link}</span> */}
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
        </div>
      </div>
    </div>
  );
};

export default Widget;
