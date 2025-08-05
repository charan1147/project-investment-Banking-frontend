import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <NavLink to="/" className="navbar-link">
            Home
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/investments" className="navbar-link">
            Investments
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/payment" className="navbar-link">
            Deposit
          </NavLink>
        </li>
        {user?.role === "admin" && (
          <li className="navbar-item">
            <NavLink to="/admin/add-investment" className="navbar-link">
              Add Investment
            </NavLink>
          </li>
        )}
        {!user ? (
          <>
            <li className="navbar-item">
              <NavLink to="/login" className="navbar-link">
                Login
              </NavLink>
            </li>
            <li className="navbar-item">
              <NavLink to="/register" className="navbar-link">
                Register
              </NavLink>
            </li>
          </>
        ) : (
          <li className="navbar-item">
            <button onClick={handleLogout} className="navbar-link logout-btn">
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
