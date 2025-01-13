import mongoose from "mongoose";

const SimulationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  prompt: { type: String, required: true },
  result: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Simulation || mongoose.model("Simulation", SimulationSchema);
