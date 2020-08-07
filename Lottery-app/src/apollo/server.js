export const getLotteryName = `query{
    lottery{
        _id
        name
        icon_name
        next_draw
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
