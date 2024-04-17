import { getClients, changeClientStatus} from "../controllers/clients";
import express from "express";
import params from "../config/params";

const router = express.Router();

//Routers for all clients related operations
router.get(params.endpoint_clients, getClients);
router.post(params.endpoint_setClientStatus, changeClientStatus);

module.exports = router;