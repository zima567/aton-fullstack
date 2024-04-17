import { status, defaultApiResponse } from "../utils/code";
import { verifyPassword, verifyLogin, verifyFullName } from "../utils/validator";
import models from "../db/models/index";
import params from "../config/params";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//Create a new user account route handler
const createAccount = ( async (req, res) => {
    //default response object
    const response = JSON.parse(JSON.stringify(defaultApiResponse));

    if(!req.body.login || !req.body.password, !req.body.fio) {
        response.code = "MISSING_REQUIRED_PARAMS";
        response.message = status.error.MISSING_REQUIRED_PARAMS;
        return res.status(404).send(response);
    }

    const login = req.body.login;
    const password = req.body.password;
    const fio = req.body.fio;

    if( !verifyPassword(password) || !verifyLogin(login) || !verifyFullName(fio)) {
        response.code = "INCORRECT_CREDENTIALS";
        response.message = status.error.INCORRECT_CREDENTIALS;
        return res.status(404).send(response);
    }

    const dbUser = await models.User.findOne({
        where: {
            login: login
        }
    });
    if(dbUser) {
        response.code = "DUBLICATE_ACCOUNT";
        response.message = status.error.DUBLICATE_ACCOUNT;
        return res.status(404).send(response);
    }

    //Encrypt password
    const encrpyptedPassword = await bcrypt.hash(password,  parseInt(params.salt_round));
    //create new account
    try {
        const newAccount = await models.User.create({
            login: login,
            password: encrpyptedPassword,
            fio: fio
        });

        response.code = "RECORD_CREATED";
        response.message = status.success.RECORD_CREATED;
        response.data = { user: newAccount };
        return res.status(200).send(response);
    } catch (error) {
        console.log(error);
        response.code = "RECORD_CREATION_FAILED";
        response.message = status.success.RECORD_CREATION_FAILED;
        return res.status(400).send(response);
    }

});

//Authentication and access token sender route handler
const getAccessToken = (async (req, res) => {
    //default response object
    const response = JSON.parse(JSON.stringify(defaultApiResponse));

    if(!req.body.login || !req.body.password) {
        response.code = "MISSING_REQUIRED_PARAMS";
        response.message = status.error.MISSING_REQUIRED_PARAMS;
        return res.status(404).send(response);
    }

    const login = req.body.login;
    const password = req.body.password;

    const dbUser = await models.User.findOne({
        where: {
            login: login
        }
    });

    if(!dbUser) {
        response.code = "NO_USER_WITH_CREDENTIALS";
        response.message = status.error.NO_USER_WITH_CREDENTIALS;
        return res.status(404).send(response);
    }

    const passwordMatch = await bcrypt.compare(password, dbUser.password);
    if(!passwordMatch) {
        response.code = "WRONG_CREDENTIALS";
        response.message = status.error.WRONG_CREDENTIALS;
        return res.status(404).send(response);
    }

    //create jwt token
    const userInfo = {
        id: dbUser.id,
        login: dbUser.login,
        createdAt: dbUser.createdAt,
        updatedAt: dbUser.updatedAt
    }
    //create jwt token for the successfully logged in user
    let token = jwt.sign(userInfo, params.jwt_secret);
    response.code = "AUTHENTICATION_SUCCEED";
    response.message = status.success.AUTHENTICATION_SUCCEED;
    response.data = { token: token };
    return res.status(200).send(response);
});

module.exports = {
    createAccount,
    getAccessToken
}