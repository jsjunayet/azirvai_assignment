import express from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { AuthController } from "./auth.controller";

const router = express.Router();

router.post("/login", AuthController.loginWithEmailAndPassword);
router.post("/me", checkAuth("OWNER"), AuthController.getME);

export const AuthRouter = router;
