import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend
app.use(express.static(path.resolve(__dirname, "../frontend")));

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/wasteconnect", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.once("open", () => console.log("✅ MongoDB connected"));

// Schemas
const binSchema = new mongoose.Schema({
    name: String,
    category: String,
    fillLevel: Number,
    lat: Number,
    lng: Number
});

const pickupSchema = new mongoose.Schema({
    userName: String,
    phone: String,
    address: String,
    lat: Number,
    lng: Number,
    binType: String,
    items: String,
    scheduledDate: Date,
    status: { type: String, default: "Pending" },
    createdAt: { type: Date, default: Date.now },
});

const Bin = mongoose.model("Bin", binSchema);
const Pickup = mongoose.model("Pickup", pickupSchema);

// API routes
app.get("/api/bins", async (req, res) => {
    const bins = await Bin.find();
    res.json(bins);
});

app.post("/api/pickups", async (req, res) => {
    const pickup = new Pickup(req.body);
    await pickup.save();
    res.json({ message: "✅ Pickup requested successfully!", pickup });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
