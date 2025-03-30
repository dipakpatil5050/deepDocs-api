import { Router } from "express";
import {
  createCard,
  getCard,
  getCards,
  updateCard,
  toggleArchiveCard,
  moveToTrash,
  restoreFromTrash,
  emptyTrash,
  getTrashCards,
} from "../controllers/card.controller.js";
import { authorize } from "../middlewares/auth.middleware.js";

const cardRouter = Router();

cardRouter.post("/", authorize, createCard);
cardRouter.get("/", authorize, getCards);
cardRouter.get("/:id", authorize, getCard);
cardRouter.put("/:id", authorize, updateCard);
cardRouter.patch("/:id/archive", authorize, toggleArchiveCard);
cardRouter.delete("/:id", authorize, moveToTrash);
cardRouter.patch("/:id/restore", authorize, restoreFromTrash);
cardRouter.delete("/trash/empty", authorize, emptyTrash);
cardRouter.get("/trash", getTrashCards);

export default cardRouter;
