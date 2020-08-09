export const login = `
mutation Login($facebookId:String,$email:String,$password:String,$type:String!,$name:String,$notificationToken:String){
    login(facebookId:$facebookId,email:$email,password:$password,type:$type,name:$name,notificationToken:$notificationToken){
     userId
     token
     tokenExpiration
     name
     email
     phone
   }
}
`

export const getLotteryName = `query{
    lottery{
        _id
        name
        icon_name
        next_draw
    }
}`

export const favouriteBall = `query{
    lottery{
        name
        hotBall{
          ball
          times
        }
        coldBall{
          ball
          times
        }
      }
}`

export const dashboardInfo = `query{
    dasboardInfo{
        lottery{
            _id
            name
            icon_name
            next_draw
        }
        draw{
            _id
            date
            balls
            specialBalls
            pending
        }
      }
}`
export const ballsById = `query LotteryBallsById($id: String!){
    lotteryBallsById(id:$id){
        _id
        lottery{
            _id
            name
        }
        date
        balls
        specialBalls
        pending
      }
}`
