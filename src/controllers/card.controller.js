import Card from "../models/card.model.js";
import { successResponse } from "../utils/responseHelper.js";

export const createCard = async (req, res, next) => {
  try {
    const { title, description, status, userId } = req.body;

    const card = await Card.create({ title, description, status, userId });
    return successResponse(res, card, "Card created successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find();
    return successResponse(res, cards, "Cards fetched successfully", 200);
  } catch (error) {
    next(error);
  }
};

export const getCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      const error = new Error("Card not found");
      error.statusCode = 404;
      throw error;
    }
    return successResponse(res, card, "Card fetched successfully");
  } catch (error) {
    next(error);
  }
};

export const updateCard = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    const card = await Card.findByIdAndUpdate(
      req.params.id,
      { title, description, status },
      { new: true }
    );
    if (!card) {
      const error = new Error("Card not found");
      error.statusCode = 404;
      throw error;
    }
    return successResponse(res, card, "Card updated successfully");
  } catch (error) {
    next(error);
  }
};

export const deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.id);
    if (!card) {
      const error = new Error("Card not found");
      error.statusCode = 404;
      throw error;
    }
    return successResponse(res, card);
  } catch (error) {
    next(error);
  }
};
