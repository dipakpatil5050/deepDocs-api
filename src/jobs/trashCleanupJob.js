import cron from "node-cron";
import Card from "../models/card.model.js";

cron.schedule("0 0 * * *", async () => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const result = await Card.deleteMany({ deletedAt: { $lte: sevenDaysAgo } });

    if (result.deletedCount > 0) {
      console.log(`${result.deletedCount} old Trash cards permanently deleted`);
    }
  } catch (error) {
    console.error("Error auto-deleting Trash cards:", error);
  }
});
