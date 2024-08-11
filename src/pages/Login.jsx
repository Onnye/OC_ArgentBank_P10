import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "../redux/actions";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.user.status);

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginData = { email, password };

    dispatch(authenticateUser(loginData)).then((result) => {
      if (authenticateUser.fulfilled.match(result)) {
        navigate("/profile");
      } else {
        alert("Erreur lors de la connexion : " + result.payload);
      }
    });
  };

  return (
    <main className="main dark-background">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="sign-in-button"
            disabled={authStatus === "loading"}
          >
            {authStatus === "loading" ? "Loading..." : "Sign In"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;
