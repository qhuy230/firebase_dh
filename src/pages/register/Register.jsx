import "./Register.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db, auth, storage } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { userInputs } from "../../formSource";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [file, setFile] = useState("");
  const [isUploadImg, setUploadImg] = useState(0);
  let [status, setStatus] = useState("write");
  const [data, setData] = useState({});
  const navitage = useNavigate();

  useEffect(() => {
    const upload = () => {
      setUploadImg(1);
      const storageRef = ref(storage, "AvatarUser/" + file.name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // setStatus=error;
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
          });
        }
      );
    };
    file && upload();
  }, [file]);

  const handleData = (e) => {
    e.preventDefault();

    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  const handleSumbmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      if (isUploadImg == 0) {
        setData({
          ...data,
          avatar:
            "https://firebasestorage.googleapis.com/v0/b/demorealtime-d1e78.appspot.com/o/AvatarUser%2Fuser.png?alt=media&token=24f0f20e-9ab3-4647-8b97-e0c2fc33503a",
        });
      }
      await setDoc(doc(db, "users", res.user.uid), {
        ...data,
        TimeCreate: serverTimestamp(),
      });
      navitage("/login");
    } catch (err) {
      setStatus = err.message;
    }
  };

  const handleReturn = () => {};

  return (
    <div className="new">
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Register</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <label htmlFor="file2">
              <DriveFolderUploadOutlinedIcon className="icon" />
            </label>
            <input
              type="file"
              id="file2"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right" onSubmit={handleSumbmit}>
            <form>
              {userInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleData}
                    required
                  />
                </div>
              ))}
              <button type="submit">Send</button>
            </form>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <button onClick={handleReturn} className="btnReturn">
                Return
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
