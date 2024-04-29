import express from "express";
import todoRoutes from "./Todo";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  res.send("Backend Running");
});

// Middleware
app.use(express.json());

// Routes
app.use("/todos", todoRoutes);

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));