import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      index: "text",
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
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
      index: true,
    },
    backgroundColor: {
      type: String,
      default: "#ffffff",
    },
    backgroundImage: {
      type: String,
      default: "",
    },
    dueDate: {
      type: Date,
      index: true,
    },
    startDate: {
      type: Date,
      index: true,
    },
    endDate: {
      type: Date,
      index: true,
    },
    archived: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
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
