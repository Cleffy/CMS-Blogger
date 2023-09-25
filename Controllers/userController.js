const { User, Post } = require('../Models');

/**
 * @function userLogin
 * @param {*} email - email of user
 * @param {*} password - password of user
 * @returns On successful login returns userdata.
 */
async function userLogin(email, password) {
    try {
        const userData = await User.findOne({ where: { email: email } });
        if(!userData) {
            return Promise.resolve(
                {
                    status: 400,
                    message: 'User does no exist'
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
 * @param {*} name - name of user
 * @param {*} email - email of user
 * @param {*} password - password of user
 * @returns User's information
 */
async function createUser(name, email, password){
    try {
        return await User.create({
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

module.exports = { userLogin, createUser };