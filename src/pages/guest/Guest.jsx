import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';

const Guest = () => {
  return (
    <div>
      <p>Guest</p>
      <Link to="/login" style={{ textDecoration: "none" }}>
        <li>
          <HomeIcon className="icon" />
        </li>
      </Link>
    </div>
  );
};

export default Guest;
