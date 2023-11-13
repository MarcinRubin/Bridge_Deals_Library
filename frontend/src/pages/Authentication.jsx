import LoginForm from "../components/LoginForm"
import RegisterForm from "../components/RegisterForm"
import { useState } from "react"

const Authentication = ({setActiveSession, client, setActiveUser}) => {
    const [isLogin, setIsLogin] = useState(true)

  return (
    <div>
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
