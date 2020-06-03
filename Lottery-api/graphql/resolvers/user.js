const User = require('../../models/user');
const { transformUser } = require('./transformation')
const bcrypt = require('bcryptjs')

module.exports = {
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
            user.notifications.push("5ebd1eb85bbb953a30f5b921")
            const result = await user.save();
            return ({ ...result._doc, password: null, _id: result.id })
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
};