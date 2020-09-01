export const login = `
mutation appLogin($facebookId:String,$email:String,$password:String,$type:String!,$name:String,$notificationToken:String){
    appLogin(facebookId:$facebookId,email:$email,password:$password,type:$type,name:$name,notificationToken:$notificationToken){
     userId
     token
     tokenExpiration
     name
     email
   }
}
`
export const createUser = `
  mutation CreateUser($userInputApp: UserInputApp){
      createUser(userInputApp:$userInputApp){
          userId
          name
          email
          token
          tokenExpiration
      }
    }`

export const profile = `
    query{
        profile{
        _id
        name
        email
        notificationToken
        lotteries
        }
    }`


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

export const SubscribeLotteryBalls = `subscription SubscribeDraw($id:String!){
    subscribeDraw(id:$id){
        balls{
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
        origin
    }
}`

export const SubscribeDashboardInfo = `subscription {
    subscribeDashBoard{
        balls{
            lottery{
              _id
              name
              next_draw
              icon_name
            }
            draw{
              _id
              date
              balls
              specialBalls
              pending
            }
          }
        origin
    }
}`

export const pushToken = `mutation PushToken($token:String!){
    pushToken(token:$token){
      _id
      notificationToken
    }
  }`

export const updateNotificationStatus = `mutation UpdateNotificationStatus($lotteryID:String!){
    updateNotificationStatus(lotteryID:$lotteryID){
      _id
      notificationToken
      lotteries
    }
  }`