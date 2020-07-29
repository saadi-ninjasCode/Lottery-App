import React from 'react'
import styles from './styles'
import { FontAwesome5 } from '@expo/vector-icons';
import { TextDefault } from '../../Text';
import { DrawerItem } from '@react-navigation/drawer';
import { scale, colors } from '../../../utilities';
import navigationService from '../../../routes/navigationService'

function DrawerItems(props) {
    const navigationState = navigationService.currentRoute()
    let check = props.name ? navigationState ? props.name === navigationState.name : false : false
    if (props.name === 'Lottery' && check) {
        check = props.id === navigationState.params.id ?? null
    }
    // console.log("props, ", props.name)
    // console.log("Nav, ", navigationState)
    // console.log("check, ", check)
    return (
        <DrawerItem style={[{ marginVertical: 0, backgroundColor: "transparent" }, check && ({ backgroundColor: colors.drawerSelected })]}
            onPress={props.onPress}
            label={() => <TextDefault style={styles.font} textColor={colors.draweHeader} > {props.text}</TextDefault>}
            icon={() => <FontAwesome5 name={props.icon} size={scale(15)} color="white" />
            }
        />
    )
}

export default DrawerItems
