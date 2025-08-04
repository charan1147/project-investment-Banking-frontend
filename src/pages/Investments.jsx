import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getInvestments } from "../services/api";

function Investments() {
  const [investments, setInvestments] = useState([]);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const response = await getInvestments();
        setInvestments(response.data);
      } catch (error) {
        setError(error.response?.data?.message || "Network error");
      }
    };

    fetchInvestments();
  }, []);

  return (
    <div>
      <h2>Investments</h2>
      {error && <p>{error}</p>}
      {investments.length > 0 ? (
        <ul>
          {investments.map((investment) => (
            <li key={investment._id}>
              <h3>{investment.name}</h3>
              <p>Type: {investment.type}</p>
              <p>Minimum Amount: {investment.minAmount}</p>
              <p>Return Rate: {investment.returnRate}%</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No investments available</p>
      )}
    </div>
  );
}

export default Investments;
