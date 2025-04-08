import Card from "../models/card.model.js";
import { successResponse } from "../utils/responseHelper.js";

export const createCard = async (req, res, next) => {
  try {
    const { title = "", description = "", backgroundColor } = req.body;

    // if (!title || !description) {
    //   const error = new Error("Title and Description are required.");
    //   error.statusCode = 400;
    //   throw error;
    // }

    const card = await Card.create({
      title,
      description,
      backgroundColor: backgroundColor || "#ffffff",
      userId: req.user._id,
    });

    return successResponse(res, card, "Card created successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const getCards = async (req, res, next) => {
  try {
    const { status, archived, page = 1, limit = 10 } = req.query;

    const query = {
      userId: req.user._id,
      deletedAt: null,
    };

    if (status) query.status = status;
    if (archived !== undefined) query.archived = archived === "true";

    const cards = await Card.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

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
    if (card.userId.toString() !== req.user._id.toString()) {
      const error = new Error("Unauthorized access to this card");
      error.statusCode = 403;
      throw error;
    }

    return successResponse(res, card, "Card fetched successfully");
  } catch (error) {
    next(error);
  }
};

export const updateCard = async (req, res, next) => {
  try {
    const { title, description, status, backgroundColor, dueDate } = req.body;

    const card = await Card.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { title, description, status, backgroundColor, dueDate },
      { new: true, runValidators: true }
    );

    if (!card) {
      const error = new Error("Card not found or unauthorized");
      error.statusCode = 404;
      throw error;
    }

    return successResponse(res, card, "Card updated successfully");
  } catch (error) {
    next(error);
  }
};

export const restoreCard = async (req, res, next) => {
  try {
    const card = await Card.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id, archived: true },
      { archived: false },
      { new: true }
    );

    if (!card) {
      const error = new Error("Card not found or already active");
      error.statusCode = 404;
      throw error;
    }

    return successResponse(res, card, "Card restored successfully");
  } catch (error) {
    next(error);
  }
};

export const toggleArchiveCard = async (req, res, next) => {
  try {
    const card = await Card.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id, deletedAt: null },
      { $set: { archived: req.body.archived } },
      { new: true }
    );

    if (!card) {
      const error = new Error("Card not found or cannot be archived");
      error.statusCode = 404;
      throw error;
    }

    return successResponse(
      res,
      card,
      `Card ${card.archived ? "archived" : "unarchived"} successfully`
    );
  } catch (error) {
    next(error);
  }
};

export const moveToTrash = async (req, res, next) => {
  try {
    const card = await Card.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { $set: { deletedAt: new Date(), archived: false } },
      { new: true }
    );

    if (!card) {
      const error = new Error("Card not found or already in Trash");
      error.statusCode = 404;
      throw error;
    }

    return successResponse(res, card, "Card moved to Trash");
  } catch (error) {
    next(error);
  }
};

// export const getTrashCards = async (req, res, next) => {
//   try {
//     const { page = 1, limit = 10 } = req.query;

//     const cards = await Card.find({
//       userId: req.user._id,
//       deletedAt: { $ne: null },
//     })
//       .sort({ deletedAt: -1 })
//       .skip((page - 1) * limit)
//       .limit(parseInt(limit));

//     return successResponse(res, cards, "Trash cards fetched successfully", 200);
//   } catch (error) {
//     next(error);
//   }
// };

export const getTrashCards = async (req, res, next) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    page = Math.max(1, parseInt(page)); // Ensure page is at least 1
    limit = Math.max(1, parseInt(limit)); // Ensure limit is at least 1

    const cards = await Card.find({
      userId: req.user._id,
      deletedAt: { $ne: null }, // Ensures only trashed cards are fetched
    })
      .sort({ deletedAt: -1 }) // Show recently deleted first
      .skip((page - 1) * limit)
      .limit(limit)
      .select("-__v"); // Exclude MongoDB version field for cleaner data

    return successResponse(res, cards, "Trash cards fetched successfully", 200);
  } catch (error) {
    next(error);
  }
};

export const restoreFromTrash = async (req, res, next) => {
  try {
    const card = await Card.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id, deletedAt: { $ne: null } },
      { $set: { deletedAt: null } },
      { new: true }
    );

    if (!card) {
      const error = new Error("Card not found in Trash");
      error.statusCode = 404;
      throw error;
    }

    return successResponse(res, card, "Card restored successfully");
  } catch (error) {
    next(error);
  }
};

export const emptyTrash = async (req, res, next) => {
  try {
    const result = await Card.deleteMany({
      userId: req.user._id,
      deletedAt: { $ne: null },
    });

    if (result.deletedCount === 0) {
      const error = new Error("No cards found in Trash");
      error.statusCode = 404;
      throw error;
    }

    return successResponse(
      res,
      null,
      `${result.deletedCount} cards permanently deleted`
    );
  } catch (error) {
    next(error);
  }
};
