import Room from "@mui/icons-material/Room";
import axios from "axios";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState, useRef } from "react";
import "./login.css";

export default function Login({ setShowLogin, myStorage, setCurrentUsername }) {
  const [error, setError] = useState(false);
  const nameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: nameRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      await axios.post("/users/login", user).then((res) => {
        setCurrentUsername(res.data.username);
        myStorage.setItem("user", res.data.username);
        setShowLogin(false);
      });
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="loginContainer">
      <div className="logo">
        <Room />
        Pin
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" ref={nameRef} />
        <input type="password" placeholder="password" ref={passwordRef} />
        <button className="loginBtn">Login</button>
        {error && <span className="failure">Something went wrong!</span>}
      </form>
      <CancelIcon className="loginCancel" onClick={() => setShowLogin(false)} />
    </div>
  );
}
