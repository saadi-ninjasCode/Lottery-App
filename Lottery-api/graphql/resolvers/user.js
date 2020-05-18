const User = require('../../models/user');
const LotteryType = require('../../models/lotteryType');
const bcrypt = require('bcryptjs')


const lotteryById = async (lotteryids) => {
    try {
        const lottery = await LotteryType.find({ _id: { $in: lotteryids } });
        return (lottery.map(lott => {
            return { ...lott._doc, _id: lott.id, next_draw: new Date(lott._doc.next_draw).toISOString() }
        }))
    }
    catch (e) {
        console.log(e)
        throw err;
    }
}

module.exports = {
    user: async () => {
        console.log("Users")
        try {
            const users = await User.find();
            return users.map(user => {
                return { ...user._doc, _id: user.id, notifications: lotteryById(user._doc.notifications) }
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
            const hasPassword = await bcrypt.hash(args.userInput.password, 12)
            const user = new User({
                name: args.userInput.name,
                email: args.userInput.email,
                password: hasPassword,
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