import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  return (
    <div className="auth flex content-center justify-center max-w-5xl mx-auto gap-3">
      <Register></Register>
      <Login></Login>
    </div>
  );
};

export default Auth;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });
      if (!response.data.token) {
        alert(response.data.message);
        return;
      }
      setCookie("token", response.data.token);
      window.localStorage.setItem("userId", response.data.userId);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthForm
      username={username}
      password={password}
      setUsername={setUsername}
      setPassword={setPassword}
      onSubmit={handleSubmit}
      label="Login"
    />
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/auth/register", {
        username,
        password,
      });
      alert("Registration complete!");
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthForm
      username={username}
      password={password}
      setUsername={setUsername}
      setPassword={setPassword}
      onSubmit={handleSubmit}
      label="Register"
    />
  );
};

interface IAuthForm {
  username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (password: string) => void;
  label: string;
  onSubmit: (event: any) => void;
}

const AuthForm = (props: IAuthForm) => {
  const { username, setUsername, password, setPassword, label, onSubmit } =
    props;
  return (
    <div className="card w-full max-w-md mt-16 shadow">
      <div className="card-body">
        <h2 className="card-title">{label}</h2>
        <p>{`${label} your account.`}</p>
        <form className="form-control w-full gap-3" onSubmit={onSubmit}>
          <div className="form-control">
            <label className="label" htmlFor="username">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="input input-bordered w-full"
              name="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div>
            <label className="label" htmlFor="password">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="input input-bordered w-full"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div>
            <button type="submit" className="btn btn-primary my-2 w-full">
              {label}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
