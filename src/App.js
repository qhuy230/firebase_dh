import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import Log from "./pages/logs/log";
import Register from "./pages/register/Register";
import Guest from "./pages/guest/Guest";
import Setting from "./pages/setting/setting";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    const autho = JSON.parse(localStorage.getItem("data_user"));
    if (currentUser) {
      console.log("1");
      if (
        autho.position !== undefined 
        // &&autho.position.toUpperCase() === "USER"
      ) {
        console.log("2");
        return children;
      } else {
        console.log("3");
        return <Guest />;
      }
    } else return <Navigate to="/login" />;
  };

  const RequireAuthe = ({ children }) => {
    const authe = JSON.parse(localStorage.getItem("data_user"));
    if (currentUser) {
      if (
        authe.position !== undefined 
        &&authe.position.toUpperCase() === "ADMIN"
      ) {
        return children;
      } else {
        console.log("ban khong co quyen truy cap ")
        return <Navigate to="/login" />;
      }
    } else return <Navigate to="/login" />;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route path="setting" element={<Setting />} />
            <Route path="users">
              <Route
                index
                element={
                  <RequireAuth>
                    <RequireAuthe>
                      <List />
                    </RequireAuthe>
                  </RequireAuth>
                }
              />
              <Route
                path=":userId"
                element={
                  <RequireAuth>
                    <RequireAuthe>
                      <Single />
                    </RequireAuthe>
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <RequireAuthe>
                      <New inputs={userInputs} title="Add New User" />
                    </RequireAuthe>
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="products">
              <Route
                index
                element={
                  <RequireAuth>
                    <List />
                  </RequireAuth>
                }
              />
              <Route
                path=":productId"
                element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
                }
              />
              {/* <Route
                path="new"
                element={
                  <RequireAuth>
                    <New inputs={productInputs} title="Add New Product" />
                  </RequireAuth>
                }
              /> */}
            </Route>
            <Route path="Single" element={<Single />} />
            <Route path="Log" element={<Log />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
