import { useState } from "react";
import { useNavigate, Link, redirect } from "react-router-dom";
import client from "../hooks/axiosClient";

export async function loader() {
  const session = await client.get("/api/active_session");
  if (session.data.isAuthenticated){
    return redirect("/");
  }
  return session.data;
};

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false)
    const navigate = useNavigate();

    const handleLogin = async (e) =>{
        e.preventDefault();
        try{
          const retrieve_csrf_cookie = await client.get("/api/csrf_cookie/");
          const response = await client.post(
              "/api/login/",
              {
                email: email,
                password: password
              }
          );
          navigate("/");
        }
        catch(err){
          setLoginError(true);
        }
    }

    return (
      <div className="login-register-container">
        <div>
        <form onSubmit={handleLogin}>
            <div className="form-container">
                <h2>Please sign in</h2>
                <label>Email</label>
                <input type="email" placeholder="Enter Email" name="email" autoComplete="off" required onChange={e => setEmail(e.target.value)}/>
                <label>Password</label>
                <input type="password" placeholder="Enter Password" name="password" required onChange={e => setPassword(e.target.value)}/>
                <button type="submit">Login</button>
                <span>Don't have an account? <Link to={"/register"}>Register Now!</Link></span>
                {loginError && <span className="error-message">Invalid login and/or password! Try again!</span>}
            </div>
        </form>
    </div>
    </div>
  )
}

export default LoginForm
