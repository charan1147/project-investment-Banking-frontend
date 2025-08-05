import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Investment Banking</h1>
      <p className="home-subtitle">
        Explore investment opportunities and manage your portfolio.
      </p>
      {user && (
        <p className="home-balance">
          Current Balance: ₹{user.balance ? user.balance.toFixed(2) : "0.00"}
        </p>
      )}
    </div>
  );
}

export default Home;
