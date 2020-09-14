const User = require('../../models/user');
const Admin = require('../../models/admin')
const { transformUser } = require('./transformation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const LotteryType = require('../../models/lotteryType');

module.exports = {
    Query: {
        user: async (_, __, context) => {
            console.log("Users")
            if (!context.req.isAuth) {
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
            if (!context.req.isAuth) {
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
        },
        profile: async (_, args, context) => {
            console.log('profile',)
            if (!context.req.isAuth) {
                throw new Error('Unauthenticated')
            }
            try {
                const user = await User.findById(context.req.userId)
                if (!user) throw new Error('User does not exist')
                return {
                    ...user._doc,
                    _id: user.id,
                    password: null
                }
            } catch (err) {
                console.log(err)
                throw err
            }
        },
    },
    Mutation: {
        appLogin: async (_, args) => {
            console.log('login', args)
            var user = args.facebookId
                ? await User.findOne({ facebookId: args.facebookId })
                : await User.findOne({ email: args.email.toLowerCase() })
            if (!user && args.type === 'google') {
                const newUser = new User({
                    email: args.email.toLowerCase(),
                    name: args.name
                })
                user = await newUser.save()
            }
            if (!user && args.facebookId) {
                const newUser = new User({
                    facebookId: args.facebookId,
                    email: args.email.toLowerCase(),
                    name: args.name
                })
                user = await newUser.save()
            }

            if (!user) {
                throw new Error("User does not exist.")
            }
            if (args.type === 'default') {
                const isEqual = await bcrypt.compare(args.password, user.password)
                if (!isEqual) {
                    throw new Error('Invliad credentials!')
                }
            }

            user.notificationToken = args.notificationToken
            const result = await user.save()
            // console.log(result.id)
            const token = jwt.sign({
                userId: result.id,
                email: result.email || result.facebookId
            }, 'somesupersecretkey');

            // console.log("token: ", token)

            return {
                ...result._doc,
                email: result.email,
                userId: result.id,
                token: token,
                tokenExpiration: 1
            }
        },
        createUser: async (_, args) => {
            console.log('createUser', args.userInputApp)
            try {
                if (args.userInputApp.email) {
                    const existingEmail = await User.findOne({
                        email: args.userInputApp.email
                    })
                    if (existingEmail)
                        throw new Error('Email is already associated with another account.')
                    const hashPassword = await bcrypt.hash(args.userInputApp.password, 12)
                    const appUser = new User({
                        name: args.userInputApp.name,
                        email: args.userInputApp.email,
                        password: hashPassword,
                        notificationToken: args.userInputApp.notificationToken,
                        lotteries: []
                    })
                    const result = await appUser.save()
                    const token = jwt.sign({
                        userId: result.id,
                        email: result.email
                    }, 'somesupersecretkey')
                    console.log({
                        ...result._doc,
                        userId: result.id,
                        token: token,
                        tokenExpiration: 1
                    })
                    return {
                        ...result._doc,
                        userId: result.id,
                        token: token,
                        tokenExpiration: 1
                    }
                }
            } catch (err) {
                throw err
            }
        },
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
                return { userId: adminLogin.id, name: adminLogin.name, token: token, tokenExpiration: 1 }
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        },
        adminChangePassword: async (_, args, context) => {
            console.log("Change Password User")
            if (!context.req.isAuth) {
                throw new Error("Unauthenticated!")
            }
            try {
                const adminLogin = await Admin.findById(context.req.userId)
                if (!adminLogin) {
                    throw new Error('User not found')
                }
                const isEqual = await bcrypt.compare(args.oldPassword, adminLogin.password)
                if (!isEqual) {
                    throw new Error('Invalid credentials!')
                }
                const hashPassword = await bcrypt.hash(args.newPassword, 12)
                adminLogin.password = hashPassword
                await adminLogin.save()
                return true
            } catch (err) {
                throw err
            }

        },
        createAdminUser: async (_, args, context) => {
            console.log("Create Admin User")
            if (!context.req.isAuth) {
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
            if (!context.req.isAuth) {
                throw new Error('Unauthenticated')
            }
            const loginUser = await Admin.findById(context.req.userId)
            if (loginUser.role !== 'admin') {
                throw new Error('You are not eligible for this operation.')
            }
            if (context.req.userId === args.id) {
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
        },
        updateNotificationStatus: async (_, args, context) => {
            console.log('Notification Status updated')
            if (!context.req.isAuth) {
                throw new Error('Unauthenticated')
            }
            //Update user array
            const user = await User.findById(context.req.userId)
            if (!user) {
                throw new Error('User not found')
            }
            const checkLottery = await user.lotteries.findIndex(id => id === args.lotteryID)
            if (checkLottery < 0)
                user.lotteries.push(args.lotteryID)
            else {
                user.lotteries.splice(checkLottery, 1)
            }
            //update Lottery array
            const lottery = await LotteryType.findById(args.lotteryID)
            if (!lottery) {
                throw new Error("Lottery not found!")
            }
            const checkUserIndex = await lottery.user_list.findIndex(id => id.toString() === context.req.userId)
            if (checkUserIndex < 0)
                lottery.user_list.push(context.req.userId)
            else {
                lottery.user_list.splice(checkUserIndex, 1)
            }

            await user.save()
            await lottery.save({ validateBeforeSave: false })

            return {
                ...user._doc,
                _id: user.id,
                password: null
            }

        }
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
    },
}