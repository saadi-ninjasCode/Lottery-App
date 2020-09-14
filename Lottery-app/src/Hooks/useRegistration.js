import React, { useState, useContext } from 'react'
import * as Permissions from 'expo-permissions'
import { Notifications } from 'expo'
import { login, createUser } from '../apollo/server'
import * as Google from 'expo-google-app-auth';
import * as AppAuth from 'expo-app-auth'
import * as Facebook from 'expo-facebook'
import getEnvVars from '../../environment'
import { gql, useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { FlashMessage } from '../components';
import UserContext from '../context/User';

const LOGIN = gql`${login}`
const CREATE_USER = gql`${createUser}`

const {
    IOS_CLIENT_ID_GOOGLE,
    ANDROID_CLIENT_ID_GOOGLE,
    FACEBOOK_APP_ID
} = getEnvVars()

function useRegistration() {
    const navigation = useNavigation()
    let notificationToken = null
    const { setTokenAsync } = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    const [loginButton, loginButtonSetter] = useState(null)
    const [mutate] = useMutation(LOGIN, { onCompleted, onError })
    const [createUser] = useMutation(CREATE_USER, { onCompleted, onError })

    async function onCompleted(data) {
        try {
            if (data.createUser)
                await setTokenAsync(data.createUser.token)
            else if (data.appLogin) {
                await setTokenAsync(data.appLogin.token)
            }
            navigation.navigate('Main')
        } catch (err) {
            console.log(err)
        }
        finally {
            setLoading(false)
        }
    }
    function onError(QueryError) {
        let errorMesage = ''
        try {
            if (QueryError.graphQLErrors.length > 0)
                errorMesage = QueryError.graphQLErrors[0].message
            else if (QueryError.networkError)
                errorMesage = QueryError.message
            FlashMessage({ message: errorMesage, type: "warning", position: 'top' })
            loginButtonSetter(null)
        } catch (err) {
            console.log(err)
        }
        finally {
            setLoading(false)
        }
    }

    async function _googleSignup() {
        const { type, user } = await Google.logInAsync({
            iosClientId: IOS_CLIENT_ID_GOOGLE,
            androidClientId: ANDROID_CLIENT_ID_GOOGLE,
            iosStandaloneAppClientId: IOS_CLIENT_ID_GOOGLE,
            androidStandaloneAppClientId: ANDROID_CLIENT_ID_GOOGLE,
            redirectUrl: `${AppAuth.OAuthRedirect}:/oauth2redirect/google`,
            scopes: ["profile", "email"]
        })
        if (type === 'success') {
            return user
        }
        else { return null }
    }
    async function _facebookSignup() {
        await Facebook.initializeAsync(FACEBOOK_APP_ID)
        const { type, token } = await Facebook.logInWithReadPermissionsAsync(
            FACEBOOK_APP_ID,
            {
                permissions: ['public_profile', 'email']
            }
        )
        if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=email,name`);
            const user = await response.json()
            return user
        }
        else { return null }
    }


    async function getPermission() {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        if (existingStatus === 'granted')
            notificationToken = await Notifications.getExpoPushTokenAsync()
    }

    async function getLogin(user) {
        mutate({ variables: { ...user, notificationToken } })
    }

    async function _signUp(user) {
        createUser({ variables: { userInputApp: { ...user, notificationToken } } })
    }

    return { getPermission, getLogin, _googleSignup, _facebookSignup, _signUp, loading, setLoading, loginButton, loginButtonSetter }

}

export default useRegistration