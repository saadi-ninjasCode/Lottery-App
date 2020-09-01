
module.exports = {
    Mutation: {
        pushToken: async (_, args, context) => {
            console.log("Notification")
            if (!context.req.isAuth) {
                throw new Error("Unauthenticated!")
            }

        }
    }
}