import { Router, type IRouter } from "express";
import healthRouter from "./health";
import bookRouter from "./book";
import subscribeRouter from "./subscribe";

const router: IRouter = Router();

router.use(healthRouter);
router.use(bookRouter);
router.use(subscribeRouter);

export default router;
