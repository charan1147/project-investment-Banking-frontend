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
    <nav className="bg-blue-600 text-white p-4">
      <ul className="flex space-x-6 max-w-7xl mx-auto">
        <li>
          <NavLink to="/" className="hover:underline">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/investments" className="hover:underline">
            Investments
          </NavLink>
        </li>
        <li>
          <NavLink to="/payment" className="hover:underline">
            Deposit
          </NavLink>
        </li>
        {user?.role === "admin" && (
          <li>
            <NavLink to="/admin/add-investment" className="hover:underline">
              Add Investment
            </NavLink>
          </li>
        )}
        {!user ? (
          <>
            <li>
              <NavLink to="/login" className="hover:underline">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" className="hover:underline">
                Register
              </NavLink>
            </li>
          </>
        ) : (
          <li>
            <button onClick={handleLogout} className="hover:underline">
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
