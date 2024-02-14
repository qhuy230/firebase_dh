import { useContext, useEffect, useState } from "react";
import "./login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navitage = useNavigate();

  const { dispatch } = useContext(AuthContext);
  useEffect(() => {
    localStorage.clear();
  }, []);
  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          localStorage.setItem("data_user", JSON.stringify(docSnap.data()));
        } else {
          localStorage.setItem("data_user", JSON.stringify(""));
        }
        dispatch({ type: "LOGIN", payload: user });
        navitage("/");
      })
      .catch((error) => {
        setError(true);
      });
  };

  return (
    <div>
      <div className="fullscreen-bg">
        <img
          class="fullscreen-bg__image"
          src="https://firebasestorage.googleapis.com/v0/b/demorealtime-d1e78.appspot.com/o/1eeee2eedd5e77002e4f.jpg?alt=media&token=17a5de8a-422f-4aba-8c98-2d66821e9d70"
          alt="Background Image"
        />
      </div>
      <div className="login">
        <h1>LOGIN</h1>
        <form onSubmit={handleLogin}>
          <div className="txt_field">
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="txt_field">
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => {return setPassword(e.target.value)}}
            />
          </div>
          <input type="submit" value="Login" />
          {error && <span>Wrong email or password!</span>}
        </form>
      </div>
    </div>
  );
};

export default Login;
