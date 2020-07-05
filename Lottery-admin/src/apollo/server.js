export const getlottery = `query{
    lottery{
        _id
        name
        next_draw
        icon_name
        user_list{
            name
        }
    }
}`
export const adminUsers = `query{
    adminUsers{
        _id
        name
        email
        role
    }
}`
export const adminLogin = `mutation AdminLogin($email:String!, $pass:String!) {
    adminLogin(email:$email, password:$pass){
        userId
        token
    }
}`

export const createLottery = `mutation CreateLottery($lotteryInput: LotteryInput!){
    createLottery(lotteryInput: $lotteryInput){
        _id
        name
        next_draw
        icon_name
        user_list{
            name
        }
    }
}`
export const createAdminUser = `mutation CreateAdminUser($userInput: UserInput!){
    createAdminUser(userInput: $userInput){
        _id
        name
        email
    }
}`

export const editLottery = `mutation EditLottery($lotteryInput: LotteryInput!){
    editLottery(lotteryInput: $lotteryInput){
        _id
        name
        next_draw
        icon_name
        user_list{
            name
        }
    }
}`

export const deleteAdminLogin = `mutation DeleteAdminlogin($id: String!){
    deleteAdminUser(id:$id){
        _id
    }
}`