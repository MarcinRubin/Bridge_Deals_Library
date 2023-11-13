import { useState } from "react";


const RegisterForm = ({setIsLogin, client}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [registerError, setRegisterError] = useState('')


  const handleRegister = async (e) =>{
    e.preventDefault();
    try{
      const response = await client.post(
          "/api/register/",
          {
            email: email,
            password: password,
            confirm_password: password2
          }
      );
    }
    catch(err){
      const response = JSON.parse(err.request.response);
      const err_msg = Object.values(response)[0];
      setRegisterError(err_msg[0].charAt(0).toUpperCase()
      + err_msg[0].slice(1));
    }

  }

    return (
      <div>
      <form onSubmit={handleRegister}>
          <div className="form-container">
              <h2>Fill up register form</h2>
              <label>Email</label>
              <input type="email" placeholder="Enter Email" name="email" autoComplete="off" required onChange={e => setEmail(e.target.value)}/>
              <label>Password</label>
              <input type="password" placeholder="Enter Password" name="password" required onChange={e => setPassword(e.target.value)}/>
              <label>Confirm password</label>
              <input type="password" placeholder="Enter Password" name="password2" required onChange={e => setPassword2(e.target.value)}/>
              <button type="submit">Register</button>
              {registerError && <span className="error-message">{registerError}</span>}
              <span>Have an account already? <a onClick={e => setIsLogin(true)}>Login now!</a></span>
          </div>
      </form>
  </div>
  )
}

export default RegisterForm
