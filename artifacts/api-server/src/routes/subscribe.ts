import { Router, type IRouter, type Request, type Response } from "express";
import rateLimit from "express-rate-limit";
import { randomBytes } from "node:crypto";
import { sql } from "drizzle-orm";
import { db, subscribersTable } from "@workspace/db";

const subscribeLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Too many requests. Please try again later." },
});

const router: IRouter = Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post(
  "/subscribe",
  subscribeLimiter,
  async (req: Request, res: Response) => {
    try {
      const email = String(req.body?.email ?? "")
        .trim()
        .toLowerCase();
      const lang = req.body?.lang === "en" ? "en" : "ru";

      if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
        res.status(400).json({ error: "invalid email" });
        return;
      }

      const unsubscribeToken = randomBytes(24).toString("hex");

      await db
        .insert(subscribersTable)
        .values({ email, lang, unsubscribeToken })
        .onConflictDoUpdate({
          target: subscribersTable.email,
          set: { lang, unsubscribedAt: null },
        });

      res.json({ ok: true });
    } catch (err) {
      req.log.error({ err }, "subscribe failed");
      res.status(500).json({ error: "subscribe failed" });
    }
  },
);

router.get("/unsubscribe", async (req: Request, res: Response) => {
  const token = String(req.query?.token ?? "").trim();
  if (!token) {
    res.status(400).send("Invalid link.");
    return;
  }
  try {
    await db
      .update(subscribersTable)
      .set({ unsubscribedAt: new Date() })
      .where(sql`${subscribersTable.unsubscribeToken} = ${token}`);
    res
      .status(200)
      .send(
        "You have been unsubscribed. Вы отписались от обновлений.",
      );
  } catch (err) {
    req.log.error({ err }, "unsubscribe failed");
    res.status(500).send("Something went wrong.");
  }
});

export default router;
