import react, { useState } from "react";

import avatar from "../../assets/default-red.png";
import "./user-menu.scss";

function UserMenu() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");

    window.location.href = "/";
  };

  if (!user) return null;

  return (
    <div className="user-menu">
      <div className="user-menu__avatar" onClick={() => setOpen(!open)}>
        <img src={avatar} alt="avatar" />
      </div>

      {open && (
        <div className="user-menu__dropdown">
          <p>{user.name}</p>
          <button onClick={handleLogout}>Sair</button>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
