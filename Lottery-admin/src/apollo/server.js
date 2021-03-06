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

export const dasboardInfo = `query{
    dasboardInfo{
        lottery{
            _id
            name
            next_draw
            icon_name
            user_list{
                name
            }
        }
        draw{
            date
        }
    }
}`

export const getColdBalls = `query{
    lottery{
        _id
        name
        icon_name
        coldBall{
            ball
            times
        }
    }
}`

export const gethotBalls = `query{
    lottery{
        _id
        name
        icon_name
        hotBall{
            ball
            times
        }
    }
}`

export const getlotteryDetails = `query Draws($page : Int, $rows: Int){
    lotteryBalls(page:$page, rows:$rows){
        _id
        date
        balls
        specialBalls
        pending
        lottery {
          _id
          name
          next_draw
        }
      }
}`
export const getTotalDraws = `query{
    drawCount
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
        name
        token
    }
}`
export const changePassword = `mutation ChangePassword($oldPassword: String!, $newPassword: String!){
    adminChangePassword(oldPassword: $oldPassword, newPassword:$newPassword)
}`

export const createLottery = `mutation CreateLottery($lotteryInput: LotteryInput!){
    createLottery(lotteryInput: $lotteryInput){
        _id
    }
}`
export const createAdminUser = `mutation CreateAdminUser($userInput: UserInput!){
    createAdminUser(userInput: $userInput){
        _id
        name
        email
    }
}`

export const createLotteryBalls = `mutation CreateLotteryBalls($lotteryInput: LotteryBallsInput!){
    createLotteryBalls(lotteryInput: $lotteryInput){
        _id
    }
}
`

export const editLottery = `mutation EditLottery($lotteryInput: LotteryInput!){
    editLottery(lotteryInput: $lotteryInput){
        _id
    }
}`

export const editFavouriteBalls = `mutation EditFavouriteBalls($ballsCountInput: BallsCountInput!){
    editFavouriteBalls(ballsCountInput:$ballsCountInput){
        _id
    }
}`

export const editLotteryBalls = `mutation EditLotteryBalls($lotteryInput: LotteryBallsInput!){
    editLotteryBalls(lotteryInput:$lotteryInput){
        _id
    }
}`


export const deleteAdminLogin = `mutation DeleteAdminlogin($id: String!){
    deleteAdminUser(id:$id){
        _id
    }
}`

export const deleteLottery = `mutation DeleteLottery($id: String!){
    deleteLottery(id: $id){
        _id
    }
}`
export const delelteColdBall = `mutation DeleteColdBalls($id: String!){
    deleteColdBalls(id: $id){
        _id
    }
}`
export const delelteHotBall = `mutation DeleteHotBalls($id: String!){
    deleteHotBalls(id: $id){
        _id
    }
}`

export const deleteDraw = `mutation DeleteDraw($id: String!){
    deleteDraw(id: $id){
        _id
    }
}`