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
    <div className="container">
      <h2 className="section-title">Investments</h2>
      {error && <p className="error-text">{error}</p>}

      {investments.length > 0 ? (
        <ul className="investment-list">
          {investments.map((investment) => (
            <li className="investment-card" key={investment._id}>
              <h3 className="investment-name">{investment.name}</h3>
              <p className="investment-detail">Type: {investment.type}</p>
              <p className="investment-detail">
                Minimum Amount: ₹{investment.minAmount}
              </p>
              <p className="investment-detail">
                Return Rate: {investment.returnRate}%
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-data-text">No investments available</p>
      )}
    </div>
  );
}

export default Investments;
