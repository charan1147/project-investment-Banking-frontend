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
    return (
      <p className="text-center mt-10 text-red-500">
        Access denied. Admin only.
      </p>
    );
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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add Investment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Type:</label>
          <input
            type="text"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Minimum Amount:
          </label>
          <input
            type="number"
            value={formData.minAmount}
            onChange={(e) =>
              setFormData({ ...formData, minAmount: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
            min="1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Return Rate (%):
          </label>
          <input
            type="number"
            value={formData.returnRate}
            onChange={(e) =>
              setFormData({ ...formData, returnRate: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
            min="0"
            step="0.01"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Investment"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
}

export default AdminAddInvestment;
