import React, { useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import { TextDefault } from '../Text'
import { colors, timeDifference } from '../../utilities'
import styles from './styles'

function Counter(props) {
    let timer = useRef()
    const next_draw = props.time ?? null
    const [timeLeft, setTimeLeft] = useState(timeDifference(next_draw));
    useEffect(() => {
        if (timeLeft != null) {
            const id = setInterval(() => {
                setTimeLeft(timeDifference(next_draw))
            }, 1000)
            timer.current = id
        }
        return () => clearInterval(timer.current)
    }, [next_draw])
    return (
        <View style={styles.counterBox}>
            <TextDefault textColor={colors.headerBackground} style={styles.leftSide} center bold>
                {'Next Draw'}
            </TextDefault>
            <View style={styles.counterContainer}>
                {timeLeft ? (
                    <>
                        <View style={styles.timerbox}>
                            <TextDefault textColor={colors.headerBackground} small>
                                {"Days"}
                            </TextDefault>
                            <TextDefault textColor={colors.white} center bold>
                                {timeLeft.days}
                            </TextDefault>
                        </View>
                        <View style={styles.timerbox}>
                            <TextDefault textColor={colors.headerBackground} small>
                                {"Hour"}
                            </TextDefault>
                            <TextDefault textColor={colors.white} center bold>
                                {timeLeft.hours}
                            </TextDefault>
                        </View>
                        <View style={styles.timerbox}>
                            <TextDefault textColor={colors.headerBackground} small>
                                {"Min"}
                            </TextDefault>
                            <TextDefault textColor={colors.white} center bold>
                                {timeLeft.minutes}
                            </TextDefault>
                        </View>
                        <View style={styles.timerbox}>
                            <TextDefault textColor={colors.headerBackground} small>
                                {"Sec"}
                            </TextDefault>
                            <TextDefault textColor={colors.white} center bold>
                                {timeLeft.seconds}
                            </TextDefault>
                        </View>
                    </>
                ) : (
                        <TextDefault textColor={colors.drawerTitleColor} center bold H4>
                            {"Pending"}
                        </TextDefault>
                    )}
            </View>
        </View>
    )
}
export default React.memo(Counter)