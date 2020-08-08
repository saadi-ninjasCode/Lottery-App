import React from 'react';
import { View, SectionList } from 'react-native';
import { gql, useQuery } from '@apollo/client'
import { favouriteBall } from '../../apollo/server'
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextDefault, Spinner, TextError } from '../../components'
import { colors, alignment } from '../../utilities';

const FAV_BALLS = gql`${favouriteBall}`

function FavouriteBall() {
    const { data, loading, error } = useQuery(FAV_BALLS)

    function Balls(data) {
        return (
            <View style={styles.box}>
                <View style={styles.header}>
                    <TextDefault textColor={colors.headerBackground} H4 bold center>
                        {data.name}
                    </TextDefault>
                </View>
                <View style={styles.boxContainer}>
                    <View style={[styles.boxInfo, { borderColor: data.color }]}>
                        <View style={styles.lotteryBalls}>
                            {data.array.length > 0 && data.array.map((objBall, i) => (
                                <View style={{ justifyContent: "center", alignItems: "center" }} key={i}>
                                    <View style={[styles.ballContainer, { backgroundColor: data.color }]}>
                                        <TextDefault textColor={colors.fontWhite} bold H3 center >
                                            {objBall.ball}
                                        </TextDefault>
                                    </View>
                                    <TextDefault textColor={colors.facebook} bold H4>
                                        {objBall.times}{' times'}
                                    </TextDefault>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    if (loading) return <Spinner />
    if (error) return <TextError text={error.message} />
    const filter = data.lottery.filter(c => c.coldBall.length)
    const sectionData = filter.map((item, index) => ({
        name: item.name, data: [{ hotBall: item.hotBall, coldBall: item.coldBall }], index
    }))

    // console.log(sectionData)
    return (
        <SafeAreaView edges={['bottom', 'left', 'right']} styles={[styles.flex, styles.mainBackground]} >
            <SectionList
                style={{ flexGrow: 1 }}
                contentContainerStyle={{...alignment.PTmedium}}
                sections={sectionData}
                keyExtractor={(item, index) => index}
                stickySectionHeadersEnabled={false}
                showsVerticalScrollIndicator={false}
                renderSectionHeader={({ section: { name } }) => (
                    <View style={styles.headerStyles}>
                        <TextDefault textColor={colors.fontWhite} H3 center>
                            {name}
                        </TextDefault>
                    </View>
                )}
                renderItem={({ item, index, section }) => (
                    <>
                        <Balls name='Cold Balls' color={colors.facebook} array={item.coldBall} />
                        <Balls name='Hot Balls' color={colors.google} array={item.hotBall} />
                    </>
                )
                }
            />


        </SafeAreaView>
    );
}
export default FavouriteBall
