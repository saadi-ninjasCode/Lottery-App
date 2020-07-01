const User = require('../../models/user');
const { transformUser } = require('./transformation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
    Query: {
        user: async () => {
            console.log("Users")
            try {
                const users = await User.find();
                return users.map(user => {
                    return transformUser(user);
                })
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        },
        login: async ({ email, password }) => {
            try {
                const user = await User.findOne({ email: email })
                if (!user) {
                    throw new Error('User does not exist.')
                }
                const isEqual = await bcrypt.compare(password, user.password)
                if (!isEqual) {
                    throw new Error('Invalid credentials!')
                }
                const token = jwt.sign({ userId: user.id, email: user.email }, 'somesupersecretkey', { expiresIn: '1h' });
                return { userId: user.id, token: token, tokenExpiration: 1 }
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        }
    },
    Mutation: {
        createUser: async (args) => {
            console.log("Create User")
            try {
                const existingUser = await User.findOne({ email: args.userInput.email });
                if (existingUser) {
                    throw new Error('Email is already associated with another account.');
                }
                const hashPassword = await bcrypt.hash(args.userInput.password, 12)
                const user = new User({
                    name: args.userInput.name,
                    email: args.userInput.email,
                    password: hashPassword,
                });
                //hard code
                user.notifications.push("5ebd1eb85bbb953a30f5b921")
                const result = await user.save();
                return ({ ...result._doc, password: null, _id: result.id })
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        },
    },
    // addNotifications: async ({ notifications }, req) => {
    //     if (!req.isAuth) {
    //         throw new Error('Invalid credentials!');
    //     }
    //     try {
    //         const user = await User.findById(req.userId);
    //         if (Array.isArray(notifications)) {
    //             notifications.map(notificationId => {
    //                 user.notifications.push(notificationId)
    //             })
    //         }
    //         else{
    //             user.notifications.push(notifications)
    //         }
    //     }
    //     catch (err) {
    //         console.log(err);
    //         throw err;
    //     }
    // },
}