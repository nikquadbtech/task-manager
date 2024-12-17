import React from "react";
import HighlightIcon from "@mui/icons-material/Highlight";

function Header({handleLogin,principal,handleLogout}) {
  return (
    <header>
      <h1>Tasks</h1>
      {principal?(<button className="login" onClick={() => handleLogout()}>Logout</button>):<button className="login" onClick={() => handleLogin()}>Login</button>}
      
      
    </header>
  );
}

export default Header;
