import { Router } from "express";
import {
  createCard,
  deleteCard,
  getCard,
  getCards,
  updateCard,
} from "../controllers/card.controller.js";
import { authorize } from "../middlewares/auth.middleware.js";

const cardRouter = Router();

cardRouter.post("/", createCard);
cardRouter.get("/", getCards);
cardRouter.get("/:id", authorize, getCard);
cardRouter.put("/:id", authorize, updateCard);
cardRouter.delete("/:id", authorize, deleteCard);

export default cardRouter;
