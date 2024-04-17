import express from "express";
import params from "../config/params";
import { createAccount, getAccessToken } from "../controllers/auth";

const router = express.Router();

//Routers for registration & authentication
router.post(params.endpoint_register, createAccount);
router.post(params.endpoint_authenticate, getAccessToken);

module.exports = router;
