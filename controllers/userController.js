const { User } = require('../models');

/**
 * @function userLogin
 * @param {STRING} email - email of user
 * @param {STRING} password - password of user
 * @returns On successful login returns userdata.
 */
async function userLogin(email, password) {
    try {
        
        const userData = await User.findOne(
            { 
                where: { email: email } 
            });
        if(!userData) {
            return Promise.resolve(
                {
                    status: 400,
                    message: 'User does not exist'
                });
        }
        const validPassword = await userData.checkPassword(password);
        if(!validPassword) {
            return Promise.resolve(
                {
                    status: 400,
                    message: 'Incorrect password'
                });
        }

        return userData;
    }
    catch(error) {
        console.error(error);
        return Promise.resolve(
            {
                status: 500,
                message: 'Error logging in user'
            });
    }
}

/**
 * @function createUser
 * @param {STRING} name - name of user
 * @param {STRING} email - email of user
 * @param {STRING} password - password of user
 * @returns User's information
 */
async function createUser(name, email, password){
    try {
        return await User.create(
            {
                name: name,
                email: email,
                password: password
            });
    }
    catch(error) {
        console.error(error);
        return Promise.resolve(
            {
                status: 500,
                message: 'Error creating user'
            });
    }
}

/**
 * @function getUserName
 * @param {INT} id - ID of user
 * @returns - name of user
 */
async function getUserName(id){
    try {
        const userData = await User.findOne(
            {
                where: { id: id }
            });
        if(!userData) {
            return Promise.resolve(
                {
                    status: 400,
                    message: 'User does not exist'
                });
        }

        return Promise.resolve(userData.name);
    }
    catch(error) {
        console.error(error);
        return Promise.resolve(
            {
                status: 500,
                message: 'Error creating user'
            });
    }
}
module.exports = { userLogin, createUser, getUserName };