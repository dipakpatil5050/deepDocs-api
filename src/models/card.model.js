import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
    },
    createdAt: {
      type: new Date(),
    },
    updatedAt: {
      type: new Date(),
    },
    backgroundColor: {
      type: String,
    },
    status: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Card = mongoose.model("Card", cardSchema);
export default Card;
