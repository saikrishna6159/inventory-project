const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// Sample data
const inventory = [
  { id: 1, productName: "Chair", category: "Furniture", price: 100 },
  { id: 2, productName: "Table", category: "Furniture", price: 200 },
  { id: 3, productName: "Phone", category: "Electronics", price: 500 },
  { id: 4, productName: "Laptop", category: "Electronics", price: 800 },
];

// API
app.get("/search", (req, res) => {
  let { q, category, minPrice, maxPrice } = req.query;

  let filtered = [...inventory];

  if (q) {
    filtered = filtered.filter(item =>
      item.productName.toLowerCase().includes(q.toLowerCase())
    );
  }

  if (category) {
    filtered = filtered.filter(item =>
      item.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (minPrice) {
    filtered = filtered.filter(item =>
      item.price >= Number(minPrice)
    );
  }

  if (maxPrice) {
    filtered = filtered.filter(item =>
      item.price <= Number(maxPrice)
    );
  }

  // invalid range
  if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
    return res.status(400).json({ message: "Invalid price range" });
  }

  res.json(filtered);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});