import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { addInvestment } from "../services/api";

function AdminAddInvestment() {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    minAmount: "",
    returnRate: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  if (user?.role !== "admin") {
    return <p className="access-denied">Access denied. Admin only.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (formData.minAmount <= 0 || formData.returnRate <= 0) {
      setError("Minimum amount and return rate must be positive");
      setLoading(false);
      return;
    }

    try {
      await addInvestment({
        ...formData,
        minAmount: parseFloat(formData.minAmount),
        returnRate: parseFloat(formData.returnRate),
      });
      alert("Investment added successfully!");
      setFormData({ name: "", type: "", minAmount: "", returnRate: "" });
    } catch (error) {
      setError(error.response?.data?.message || "Failed to add investment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-form-container">
      <h2 className="form-title">Add Investment</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Type:</label>
          <input
            type="text"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Minimum Amount:</label>
          <input
            type="number"
            value={formData.minAmount}
            onChange={(e) =>
              setFormData({ ...formData, minAmount: e.target.value })
            }
            required
            min="1"
          />
        </div>
        <div className="form-group">
          <label>Return Rate (%):</label>
          <input
            type="number"
            value={formData.returnRate}
            onChange={(e) =>
              setFormData({ ...formData, returnRate: e.target.value })
            }
            required
            min="0"
            step="0.01"
          />
        </div>
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Adding..." : "Add Investment"}
        </button>
        {error && <p className="form-error">{error}</p>}
      </form>
    </div>
  );
}

export default AdminAddInvestment;
