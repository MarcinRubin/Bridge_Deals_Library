import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"
import { useState } from "react"

const Authentication = ({setActiveSession, client, setActiveUser}) => {
    const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="login-register-container">
        {isLogin && <LoginForm
            setIsLogin = {setIsLogin}
            setActiveSession = {setActiveSession}
            client = {client}
            setActiveUser = {setActiveUser}
        />}
        {!isLogin && <RegisterForm
            setIsLogin = {setIsLogin}
            client = {client}
        />}
    </div>
  )
}

export default Authentication
