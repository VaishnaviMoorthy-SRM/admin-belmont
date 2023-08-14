import React from "react";
import Logo from '../assets/logo.png'
function NavBar() {
  return (
    <>
      <nav>
        <a href="https://belmontprivate.com.au/">
          <div class="site-logo-canvas">
            <img
              className="logo-img"
              src={Logo}
              alt="Belmon Hospital"
            />
          </div>
        </a>
      </nav>
    </>
  );
}

export default NavBar;
