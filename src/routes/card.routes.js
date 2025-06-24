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
  getArchivedCards,
} from "../controllers/card.controller.js";
import { authorize } from "../middlewares/auth.middleware.js";

const cardRouter = Router();

cardRouter.post("/", authorize, createCard);
cardRouter.get("/", authorize, getCards);

cardRouter.delete("/trash/empty", authorize, emptyTrash);
cardRouter.get("/trash", authorize, getTrashCards);
cardRouter.get("/:id", authorize, getCard);
cardRouter.put("/:id", authorize, updateCard);
cardRouter.patch("/:id/archive", authorize, toggleArchiveCard);
cardRouter.get("/archived", authorize, getArchivedCards);
cardRouter.delete("/:id", authorize, moveToTrash);
cardRouter.patch("/:id/restore", authorize, restoreFromTrash);

export default cardRouter;
