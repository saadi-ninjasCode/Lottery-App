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
        icon: 'user-o',
        navigateTo: 'Profile',
        isAuth: true
    },
    {
        title: 'Notifications',
        icon: 'bell-o',
        navigateTo: 'Notifications',
        isAuth: true
    },
    {
        title: 'Hot & Cold',
        icon: 'snowflake-o',
        navigateTo: 'Favourite',
        isAuth: false
    },
    {
        title: 'Number Generator',
        icon: 'refresh',
        navigateTo: 'Generator',
        isAuth: false
    },
]

const BottomMenu = [
    {
        title: 'Setting',
        icon: 'gear',
        navigateTo: 'Setting',
        isAuth: true
    },
    {
        title: 'Contact',
        icon: 'envelope',
        navigateTo: 'Contact',
        isAuth: false
    },
    {
        title: 'Privacy Policy',
        icon: 'book',
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
    const { error, data } = useQuery(GET_LOTTERY)
    if (error) return <TextError text='Something is not working Properly' />
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
                                {data ? data.lottery.length > 0 && (
                                    data.lottery.map((dataItem, ind) => (
                                        <DrawerItems
                                            key={ind}
                                            id={dataItem._id}
                                            name={'Lottery'}
                                            icon={'caret-right'}
                                            text={dataItem.name}
                                            onPress={() => navigation.navigate('Lottery', { id: dataItem._id })}
                                        />
                                    ))
                                ) : null}

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
