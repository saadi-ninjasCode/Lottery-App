import React, { useContext } from 'react'
import { View, TouchableOpacity } from 'react-native'
import styles from './styles'
import { TextDefault } from '../../Text'
import { colors } from '../../../utilities'
import { useNavigation } from '@react-navigation/native'
import UserContext from '../../../context/User'
import Spinner from '../../Spinner/Spinner'

function DrawerProfile() {
    const navigation = useNavigation()
    const { isLogged, loadingProfile, profile } = useContext(UserContext)
    if (loadingProfile) return <Spinner backColor='transparent' spinnerColor={colors.drawerTitleColor} />
    return (
        <View style={styles.mainContainer}>
            {!isLogged ? (
                <View style={styles.loginContainer}>
                    <TouchableOpacity style={styles.touchSpace} onPress={() => navigation.navigate('Registration')}>
                        <TextDefault textColor={colors.drawerColor} style={styles.font} H4>
                            {'Login/Create Account'}
                        </TextDefault>
                    </TouchableOpacity>
                </View>
            ) : (
                    <View style={styles.loginContainer}>
                        {isLogged && (
                            <View style={styles.subConainer}>
                                <View style={styles.imgContainer}>
                                    <TextDefault textColor={colors.white} style={styles.fonts} H1>
                                    {profile.name[0].toUpperCase()}
                                    </TextDefault>
                                </View>
                                <TextDefault textColor={colors.drawerTitleColor} style={styles.font} H4>
                                    {profile.name}
                                </TextDefault>
                            </View>
                        )}
                    </View>
                )
            }
        </View>
    )
}

export default DrawerProfile
