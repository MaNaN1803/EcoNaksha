import mongoose from "mongoose";

const CollaborationSchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  messages: [
    {
      sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      message: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.models.Collaboration || mongoose.model("Collaboration", CollaborationSchema);
