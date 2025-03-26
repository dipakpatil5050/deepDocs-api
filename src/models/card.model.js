import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "in-progress"],
      default: "pending",
      index: true,
    },
    backgroundColor: {
      type: String,
      default: "#ffffff",
    },
    dueDate: {
      type: Date,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

cardSchema.index({ userId: 1, status: 1 });

const Card = mongoose.model("Card", cardSchema);
export default Card;
