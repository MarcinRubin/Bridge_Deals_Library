import { useState, useEffect } from "react";

const LoginForm = ({setIsLogin, setActiveSession, client, setActiveUser}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false)

    const handleLogin = async (e) =>{
        e.preventDefault();
        try{
          const response = await client.post(
              "/api/login/",
              {
                email: email,
                password: password
              }
          )
          if(response.status === 200) {
            setActiveSession(true);
            setActiveUser(reposne.data['email'])
          }
        }
        catch(err){
          setLoginError(true)
        }
    }


    return (
    <div>
        <form onSubmit={handleLogin}>
            <div className="form-container">
                <h2>Please sign in</h2>
                <label>Email</label>
                <input type="email" placeholder="Enter Email" name="email" autoComplete="off" required onChange={e => setEmail(e.target.value)}/>
                <label>Password</label>
                <input type="password" placeholder="Enter Password" name="password" required onChange={e => setPassword(e.target.value)}/>
                <button type="submit">Login</button>
                <span>Don't have an account? <a onClick={e => setIsLogin(false)}>Register now!</a></span>
                {loginError && <span className="error-message">Invalid login and/or password! Try again!</span>}
            </div>
        </form>
    </div>
  )
}

export default LoginForm
