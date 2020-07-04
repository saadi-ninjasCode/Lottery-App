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

export const login = `mutation Login($email:String!, $pass:String!) {
    login(email:$email, password:$pass){
        userId
        token
    }
}`