import React from 'react'
import { View } from 'react-native'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import styles from './styles'
import { DrawerProfile, DrawerItems } from '../Drawer'
import { useNavigation } from '@react-navigation/native'
import { TextDefault, TextError } from '../Text'
import { colors } from '../../utilities'
import { gql, useQuery } from '@apollo/client'
import { getLotteryName } from '../../apollo/server'
import Spinner from '../Spinner/Spinner'


const GET_LOTTERY = gql`${getLotteryName}`

const Home = {
    title: 'Home',
    icon: 'home',
    navigateTo: 'Main',
    isAuth: true
}
const TopMenus = [
    {
        title: 'Profile',
        icon: 'user',
        navigateTo: 'Profile',
        isAuth: true
    },
    {
        title: 'Notifications',
        icon: 'bell',
        navigateTo: 'Notifications',
        isAuth: true
    },
    {
        title: 'Hot & Cold',
        icon: 'snowflake',
        navigateTo: 'Favourite',
        isAuth: false
    },
    {
        title: 'Number Generator',
        icon: 'sync-alt',
        navigateTo: 'Generator',
        isAuth: false
    },
]

const BottomMenu = [
    {
        title: 'Setting',
        icon: 'cog',
        navigateTo: 'Setting',
        isAuth: true
    },
    {
        title: 'Contact',
        icon: 'id-card',
        navigateTo: 'Contact',
        isAuth: false
    },
    {
        title: 'Privacy Policy',
        icon: 'file-signature',
        navigateTo: 'Privacy',
        isAuth: false
    },
    // {
    //     title: 'Cookie Policy',
    //     icon: 'question',
    //     navigateTo: 'Help',
    //     isAuth: true
    // },
]

function SideBar(props) {
    const navigation = useNavigation()
    const { error, loading, data } = useQuery(GET_LOTTERY)
    return (
        <DrawerContentScrollView {...props} >
            <View style={{ flex: 1, backgroundColor: 'transparent' }}>
                <View style={styles.headerContainer}>
                    <DrawerProfile />
                </View>
                <View style={styles.menuContainer}>
                    <View style={{ backgroundColor: "transparent" }}>
                        {/* HOme Button */}
                        <DrawerItems
                            name={Home.navigateTo}
                            icon={Home.icon}
                            text={Home.title}
                            onPress={() => navigation.navigate(Home.navigateTo)} />

                        <View style={styles.line} />
                        <View style={styles.lotteryContainer}>
                            <TextDefault
                                style={styles.font}
                                textColor={colors.fontWhite} H5 >
                                {'Lottery Results'}
                            </TextDefault>
                            <View style={styles.resultContainer}>
                                {error ? <TextError text={error.message} mainColor={'transparent'} textColor={colors.drawerTitleColor} /> :
                                    loading ? <Spinner backColor='transparent' spinnerColor={colors.white} size='small' /> :
                                        data ? data.lottery.length > 0 && (
                                            data.lottery.map((dataItem, ind) => (
                                                <DrawerItems
                                                    key={ind}
                                                    id={dataItem._id}
                                                    name={'Lottery'}
                                                    icon={dataItem.icon_name}
                                                    text={dataItem.name}
                                                    onPress={() => navigation.navigate('Lottery', { lotteryId: dataItem._id })}
                                                />
                                            ))
                                        ) :
                                            null}

                            </View>
                        </View>
                        <View style={styles.line} />
                        {TopMenus.map((dataItem, ind) => (
                            <DrawerItems
                                key={ind}
                                name={dataItem.navigateTo}
                                icon={dataItem.icon}
                                text={dataItem.title}
                                onPress={() => navigation.navigate(dataItem.navigateTo)} />
                        ))

                        }

                    </View>
                    <View style={styles.bottomMenu}>
                        {BottomMenu.map((dataItem, ind) => (
                            <DrawerItems
                                key={ind}
                                name={dataItem.navigateTo}
                                icon={dataItem.icon}
                                text={dataItem.title}
                                onPress={() => navigation.navigate(dataItem.navigateTo)} />
                        ))}
                    </View>
                </View>
            </View>
        </DrawerContentScrollView>
    )
}

export default React.memo(SideBar)
