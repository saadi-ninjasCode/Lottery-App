const User = require('../../models/user');
const Admin = require('../../models/admin')
const { transformUser } = require('./transformation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

module.exports = {
    Query: {
        user: async (_, __, context) => {
            console.log("Users")
            if (!context.isAuth) {
                throw new Error("Unauthenticated!")
            }
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
        adminUsers: async (_, __, context) => {
            console.log("Admin Users")
            if (!context.isAuth) {
                throw new Error("Unauthenticated!")
            }
            try {
                const adminUsers = await Admin.find();
                return adminUsers.map(user => {
                    return transformUser(user)
                })
            } catch (err) {
                console.log(err)
                throw err;
            }
        }
    },
    Mutation: {
        adminLogin: async (_, args) => {
            console.log('Admin Login')
            try {
                const adminLogin = await Admin.findOne({ email: args.email })
                if (!adminLogin) {
                    throw new Error('User does not exist.')
                }
                const isEqual = await bcrypt.compare(args.password, adminLogin.password)
                if (!isEqual) {
                    throw new Error('Invalid credentials!')
                }
                const token = jwt.sign({ userId: adminLogin.id, email: adminLogin.email }, 'somesupersecretkey');
                return { userId: adminLogin.id, token: token, tokenExpiration: 1 }
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        },
        createAdminUser: async (_, args, context) => {
            console.log("Create Admin User")
            if (!context.isAuth) {
                throw new Error("Unauthenticated!")
            }
            try {
                const existingUser = await Admin.findOne({ email: args.userInput.email });
                if (existingUser) {
                    throw new Error('Email is already associated with another account.');
                }
                const hashPassword = await bcrypt.hash(args.userInput.password, 12)
                const adminUser = new Admin({
                    name: args.userInput.name,
                    email: args.userInput.email,
                    password: hashPassword,
                    role: args.userInput.role
                });
                const result = await adminUser.save();
                return ({ ...result._doc, password: null, _id: result.id })
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        },
        deleteAdminUser: async (_, args, context) => {
            console.log('Delete Admin User')
            if (!context.isAuth) {
                throw new Error('Unauthenticated')
            }
            const loginUser = await Admin.findById(context.userId)
            if (loginUser.role !== 'admin') {
                throw new Error('You are not eligible for this operation.')
            }
            if (context.userId === args.id) {
                throw new Error('You can not remove yourself.')
            }
            try {
                const result = await Admin.deleteOne({ _id: args.id })
                if (result === 0) {
                    throw new Error("Deletion failed")
                }
                else {
                    return transformUser(loginUser)
                }
            } catch (err) {
                console.log(err);
                throw err;
            }
        }
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