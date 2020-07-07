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
export const getlotteryDetails = `query{
    lotteryBalls{
        _id
        date
        balls
        specialBalls
        pending
        lottery {
          _id
          name
          next_draw
          coldBall {
            ball
            times
          }
          hotBall {
            ball
            times
          }
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

export const editLottery = `mutation EditLottery($lotteryInput: LotteryInput!){
    editLottery(lotteryInput: $lotteryInput){
        _id
    }
}`

export const editFavouriteBalls = `mutation EditFavouriteBalls($ballsCountInput: BallsCountInput!){
    editFavouriteBalls(ballsCountInput:$ballsCountInput){
        _id
        name
        icon_name
        coldBall
        hotBall
    }
}`

export const deleteAdminLogin = `mutation DeleteAdminlogin($id: String!){
    deleteAdminUser(id:$id){
        _id
    }
}`

export const delelteLottery = `mutation DeleteLottery($id: String!){
    deleteLottery(id: $id){
        _id
    }
}`