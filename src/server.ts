import express from "express";
import todoRoutes from "./Todo";
import userRoutes from "./User";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  res.send("Backend Running");
});

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/users", userRoutes);
app.use("/todos", todoRoutes);

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
