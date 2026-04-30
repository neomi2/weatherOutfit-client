import { useDispatch, useSelector } from "react-redux";
import { Link,useLocation  } from "react-router-dom";
import { logOut } from "../features/userSlice";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Badge from "@mui/material/Badge";
import "../css/NavBar.css";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  let user = useSelector((state) => state.user.currentUser);
  let disp = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    disp(logOut());
    navigate("/");
  };
  const location = useLocation(); 
  const navbarColor = location.pathname === "/list" ? "#f3f3f3": "rgb(205 213 239)" ;
  const navborderColor = location.pathname === "/list" ? "2px solid white": "2px solid rgb(173 194 255)" ;
  
  return (
    <nav >
      <ul className="bar" style={{
        listStyle: "none",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",
        border: navborderColor,
        backgroundColor:navbarColor
      }}>
      <li className="lilink">
          <Link to="/">
            <img className="logo" src="./images/logo7.png" />
          </Link>
        </li>
        {!user && (
          <>
            <li className="lilink">
              <Link to="login">כניסה</Link>
            </li>
            <li className="lilink">
          <Link to="/">מזג האויר</Link>
        </li>
          </>
        )}

        {user && (
          <>
          <li className="lilink">
            <Link to="addproduct">הוספת בגד</Link>
            </li>
            <li className="lilink">
          <Link to="list">ארון הבגדים</Link>
        </li>
                  <li className="lilink">
                  <LogoutIcon
                    style={{
                      cursor: "pointer",
                      fontSize: 30,
                      color: "black",
                    }}
                    onClick={handleLogout}
                  />
            </li>
          </>
        )}

      </ul>
    </nav>
  );
};

export default NavBar;
