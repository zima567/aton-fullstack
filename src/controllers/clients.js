import { status, defaultApiResponse } from "../utils/code";
import { verifyPassword, verifyLogin, objEmpty } from "../utils/validator";
import models from "../db/models/index";
import params from "../config/params";


//Display all clients linked to a user route handler
const getClients = ( async (req, res) => {
    //default response object
    const response = JSON.parse(JSON.stringify(defaultApiResponse));

    //verify if user is authenticated
    if(!req.authUser || (req.authUser && objEmpty(req.authUser))) {
        response.code = "AUTHENTICATION_REQUIRED";
        response.message = status.error.AUTHENTICATION_REQUIRED;
        return res.status(404).send(response);
    }

    const userId = req.authUser.id;
    const clientId = req.query.id ? req.query.id : 0;
    const limit = req.query.limit ? parseInt(req.query.limit) : 25;
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;

    //Select all clients linked to the authorized user
    try {
        let clientsOfResponsable = [];
        if(!clientId) {
            clientsOfResponsable = await models.Client.findAll({
                limit: limit,
                offset: offset,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'UserId', 'fioResponsable']
                },
                where: {
                    fioResponsable: userId
                },
                include: [{
                    model: models.User,
                    attributes: [['fio', 'fioResponsable']]
                }]
            });
        } else if(clientId) {
            const clientRecord = await models.Client.findOne({
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'UserId']
                },
                where: {
                    fioResponsable: userId,
                    id: clientId
                }
            });
            if(clientRecord) {
                clientsOfResponsable.push(clientRecord);
            }
        }

        response.data = { clients: clientsOfResponsable };
        return res.status(200).send(response);
    } catch (error) {
        console.log(error);
        response.code = "DATA_FETCH_FAILED";
        response.message = status.error.DATA_FETCH_FAILED;
        return res.status(404).send(response);    
    }
});

//Change clients statuses route handler
const changeClientStatus = ( async (req, res) => {
    //default response object
    const response = JSON.parse(JSON.stringify(defaultApiResponse));

    //verify if user is authenticated
    if(!req.authUser || (req.authUser && objEmpty(req.authUser))) {
        response.code = "AUTHENTICATION_REQUIRED";
        response.message = status.error.AUTHENTICATION_REQUIRED;
        return res.status(404).send(response);
    }

    if(!req.body.clients || !Array.isArray(req.body.clients)) {
        response.code = "MISSING_REQUIRED_PARAMS";
        response.message = status.error.MISSING_REQUIRED_PARAMS;
        return res.status(404).send(response);
    }

    const clients = req.body.clients;
    const userId = req.authUser.id;

    const statusPossible = ['Не в работе', 'В работе', 'Отказ', 'Сделка закрыта'];
    const updateResult = [];
    for (let index = 0; index < clients.length; index++) {
        if(statusPossible.includes(clients[index].status)) {
            // Change everyone without a last name to "Doe"
            let updateOperation = await models.Client.update({
               status: clients[index].status 
             },
             { 
                where: {
                 id: clients[index].id,
                 fioResponsable: userId
               }
             }
            );
            updateResult.push({
                clientId: clients[index].id,
                updateOperation: updateOperation[0] ? "succeed" : "failed",
                status: clients[index].status 
            });
        }
    }

    response.data = { result: updateResult };
    return res.status(200).send(response);
});

module.exports = {
    getClients,
    changeClientStatus
}