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

export const createLottery = `mutation CreateLottery($lotteryInput:LotteryInput!){
    createLottery(lotteryInput:$ $lotteryInput){
        _id
        name
        next_draw
        icon_name
        user_list
    }
}`

export const adminLogin = `mutation AdminLogin($email:String!, $pass:String!) {
    adminLogin(email:$email, password:$pass){
        userId
        token
    }
}`