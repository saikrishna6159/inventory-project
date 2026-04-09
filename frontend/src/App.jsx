import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [results, setResults] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearch = async () => {
    const params = new URLSearchParams({
      q: query,
      category,
      minPrice,
      maxPrice
    });

    const res = await fetch(`http://localhost:5000/search?${params}`);
    const data = await res.json();
    setResults(data);
  };

  return (
    <div style={{ fontFamily: "Arial", background: "#f5f7fa", minHeight: "100vh", padding: "20px" }}>
      
      {/* Header */}
      <h1 style={{ textAlign: "center", color: "#333" }}>
        🛒 Inventory Search
      </h1>

      {/* Search Card */}
      <div style={{
        maxWidth: "700px",
        margin: "auto",
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
      }}>

        {/* Search */}
        <div style={{ marginBottom: "10px" }}>
          🔍 <input
            placeholder="Search product..."
            onChange={(e) => setQuery(e.target.value)}
            style={{ width: "90%", padding: "8px" }}
          />
        </div>

        {/* Category */}
        <div style={{ marginBottom: "10px" }}>
          📂 <select
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: "95%", padding: "8px" }}
          >
            <option value="">All Categories</option>
            <option value="Furniture">Furniture 🪑</option>
            <option value="Electronics">Electronics 💻</option>
          </select>
        </div>

        {/* Price */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          💰 <input
            type="number"
            placeholder="Min Price"
            onChange={(e) => setMinPrice(e.target.value)}
            style={{ flex: 1, padding: "8px" }}
          />

          <input
            type="number"
            placeholder="Max Price"
            onChange={(e) => setMaxPrice(e.target.value)}
            style={{ flex: 1, padding: "8px" }}
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSearch}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          🔎 Search
        </button>
      </div>

      {/* Results */}
      <div style={{ maxWidth: "700px", margin: "20px auto" }}>
        {results.length === 0 ? (
          <p style={{ textAlign: "center", color: "#555" }}>
            ❌ No results found
          </p>
        ) : (
          results.map((item) => (
            <div
              key={item.id}
              style={{
                background: "white",
                padding: "15px",
                marginBottom: "10px",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
              }}
            >
              <h3>📦 {item.productName}</h3>
              <p>📂 Category: {item.category}</p>
              <p>💰 Price: ₹{item.price}</p>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default App;