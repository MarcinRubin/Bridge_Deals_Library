import { Link, useNavigate } from "react-router-dom";
import useToggle from "../hooks/useToggle";
import { useRef } from "react";
import client from "../hooks/axiosClient";
import { DropMenu, DropMenuElement, DropMenuElementLink, DropMenuHeader } from "./DropMenu";

const Header = ({profile, profile_pic}) => {
  const navigate = useNavigate();
  const [profileMenu, toggle] = useToggle(false);
  const [dealMenu, toggleDeal] = useToggle(false);
  const myRef = useRef();

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
        <Link to={``} className="logo">LOGO</Link>
            <nav className="header-nav">
              <ul>
                <li className ="drop-menu-wrapper" onClick={toggleDeal} style={{backgroundColor: dealMenu ? "var(--green-darker-color)" : ""}}>
                  <a>New Deal <i className={dealMenu ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'}></i></a>
                  <DropMenu  isActive={dealMenu} toggle={toggleDeal} xtranslate={0} ytranslate={80}>
                    <DropMenuElementLink text={"Custom"} icon={"bi bi-file-plus-fill"} link={"create"} />
                    <DropMenuElementLink text={"From link"} icon={"bi bi-box-arrow-down"} link={"link_create"} />
                    <DropMenuElement text={"From tournament"} icon={"bi bi-bag-plus"} />
                  </DropMenu>
                </li>
                <li><Link to={`deals`}>All Deals</Link></li>
                <li><Link to={'mydeals'}> My Deals</Link></li>
              </ul>
            </nav>
        </div>
        <div className="right-control-panel">
            <span className='username-tag'>Hello {profile}!</span>
            <div className="drop-menu-wrapper">
            <div className="profile-picture-wrapper"><img src={profile_pic} alt="" onClick = {toggle}/></div>
            <DropMenu isActive={profileMenu} toggle={toggle} xtranslate={-60} ytranslate={80}>
              <DropMenuHeader>
                <div className="profile-menu-profile">
                  <div className="mini-profile-picture-wrapper"><img src={profile_pic} alt=""/></div>
                  <a>{profile}</a>
                </div>
              </DropMenuHeader>
              <DropMenuElement text={"My Profile"} icon={"bi bi-person-fill"}/>
              <DropMenuElementLink text={"Logout"} icon={"bi bi-box-arrow-right"} link={"login"} onClick={handleLogout}/>
            </DropMenu>
            </div>
            {
              /*profileMenu &&
                <div className="profile-menu-wrapper">
                  <div className="profile-menu-profile">
                  <div className="mini-profile-picture-wrapper"><img src={profile_pic} alt=""/></div>
                  <a>{profile}</a>
                  </div>
                  <ul>
                    <li><a href="#"><i className="bi bi-person-fill"></i><span>My profile</span></a></li>
                    <li><Link to={`login`} onClick={handleLogout}><i className="bi bi-box-arrow-right"></i><span>Log out</span></Link></li>
                  </ul>
                </div>*/
            }
        </div>
    </div>
  )
}

export default Header
