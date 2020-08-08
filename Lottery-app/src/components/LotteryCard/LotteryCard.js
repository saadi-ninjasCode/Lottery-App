import React from 'react'
import { View } from 'react-native'
import { TextDefault } from '../Text'
import styles from './styles'
import { colors, dateTransformation, getZone } from '../../utilities'

function LotteryCard(props) {
    return (
        <View style={styles.lotteryBox}>
            <View style={styles.boxHeader}>
                <TextDefault textColor={colors.headerBackground} H3 bold center>
                    {props.lottery.name}{' Results'}
                </TextDefault>
            </View>
            <View style={styles.boxContainer}>
                <View style={styles.boxInfo}>
                    <TextDefault numberOfLines={1} textColor={colors.headerText} H5 bold>
                        {dateTransformation(props.date ?? null, true)}
                    </TextDefault>
                    <TextDefault numberOfLines={1} textColor={colors.headerText}>
                        {getZone(props.date ?? null)}
                    </TextDefault>
                    <View style={styles.lotteryBalls}>
                        {props.pending ? (
                            <TextDefault textColor={colors.yellow} H4 bold>
                                {'Result Pending'}
                            </TextDefault>
                        ) : (
                                <>
                                    {props.balls.filter(Boolean).map((item, index) => (
                                        <View style={[styles.ballContainer, { backgroundColor: colors.yellow }]} key={index}>
                                            <TextDefault style={styles.font} textColor={colors.headerBackground} bold H4 center >
                                                {item}
                                            </TextDefault>
                                        </View>
                                    ))}
                                    {props.specialBalls.filter(Boolean).map((item, index) => (
                                        <View style={[styles.ballContainer, { backgroundColor: colors.green }]} key={index}>
                                            <TextDefault style={styles.font} textColor={colors.headerBackground} bold H4 center >
                                                {item}
                                            </TextDefault>
                                        </View>
                                    ))
                                    }
                                </>
                            )}
                    </View>
                </View>
            </View>
        </View>
    )
}
export default React.memo(LotteryCard)