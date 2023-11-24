import { Link, useNavigate } from "react-router-dom";
import client from "../hooks/axiosClient";

const Header = ({user}) => {

  const navigate = useNavigate();

  const handleLogout = async (e) =>{
    e.preventDefault;
    try{
      const response = await client.post("/api/logout/");
      navigate("/login");
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <div className="header-container">
        <div className="left-control-panel">
            <div className="logo">LOGO</div>
            <nav className="header-nav">
              <ul>
                <li><Link to={`create`}>Create Deal</Link></li>
                <li><Link to={`deals`}>All Deals</Link></li>
                <li><Link to={'mydeals'}> My Deals</Link></li>
              </ul>
            </nav>
        </div>
        <div className="right-control-panel">
            <span className='username-tag'>{user}</span>
            <button className="logout" onClick={handleLogout}>Log out</button>
        </div>
    </div>
  )
}

export default Header
