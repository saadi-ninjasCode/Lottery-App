import React, { useState, useEffect } from 'react'
import { AsyncStorage } from 'react-native'
import { useApolloClient, gql, useLazyQuery } from '@apollo/client'
import { profile } from '../apollo/server'

const UserContext = React.createContext({})

const PROFILE = gql`${profile}`


export function UserProvider(props) {
    const [token, setToken] = useState('')
    const client = useApolloClient()

    const [
        fetchProfile,
        {
            called: calledProfile,
            loading: loadingProfile,
            error: errorProfile,
            data: dataProfile
        }] = useLazyQuery(PROFILE, { fetchPolicy: 'network-only', onCompleted, onError })

    useEffect(() => {
        async function checkLogin() {
            const token = await AsyncStorage.getItem('token')
            setToken(token)
        }
        checkLogin()
    }, [])

    useEffect(() => {
        if (!token) return
            ; (async () => {
                await fetchProfile()
            })()
    }, [token])

    function onCompleted({ profile }) {
        console.log('onCompleted')
    }
    function onError(error) {
        console.log('error context', error)
    }

    const setTokenAsync = async (token) => {
        await AsyncStorage.setItem("token", token)
        setToken(token)
    }

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('token')
            setToken(null)
            await client.resetStore()
        } catch (error) {
            console.log('error on logout', error)
        }
    }

    return (
        <UserContext.Provider
            value={{
                isLogged: !!token && dataProfile && !!dataProfile.profile,
                setTokenAsync,
                logout,
                loadingProfile: loadingProfile && calledProfile,
                errorProfile,
                profile:
                    dataProfile && dataProfile.profile ? dataProfile.profile : null,
            }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext