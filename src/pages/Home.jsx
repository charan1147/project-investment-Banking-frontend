import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to Investment Banking</h1>
      <p className="text-lg mb-4">
        Explore investment opportunities and manage your portfolio.
      </p>
      {user && (
        <p className="text-lg">
          Current Balance: ₹{user.balance ? user.balance.toFixed(2) : "0.00"}
        </p>
      )}
    </div>
  );
}

export default Home;
