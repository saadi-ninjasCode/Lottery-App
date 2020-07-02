export const getlottery = `query{
    lottery{
        _id
        name
        next_draw
        user_list{
            name
        }
    }
}`