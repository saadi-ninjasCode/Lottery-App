import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import styles from './styles';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery, gql, useApolloClient } from '@apollo/client';
import { Spinner, TextError, LotteryCard, TextDefault } from '../../components';
import { ballsById, SubscribeDashboardInfo, SubscribeLotteryBalls } from '../../apollo/server'
import { colors } from '../../utilities';

const LOTTERY_DRAW = gql`${ballsById}`
const SUBSCRIPTION_INFO = gql`${SubscribeLotteryBalls}`

function Lottery() {
    const client = useApolloClient()
    const route = useRoute()
    const lotteryId = route.params?.lotteryId ?? null
    const { data, loading, error, refetch, networkStatus, subscribeToMore } = useQuery(LOTTERY_DRAW, { fetchPolicy: 'network-only', variables: { id: lotteryId } })

    useEffect(() => {
        subscribeBall()
    }, [])
    function subscribeBall() {
        try {
            const unsubscribeInfo = subscribeToMore({
                document: SUBSCRIPTION_INFO,
                variables: { id: lotteryId },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev
                    const newFeedItem = subscriptionData.data.subscribeDraw;
                    if (newFeedItem.origin === 'edit') {
                        let { lotteryBallsById } = prev
                        const ballIndex = lotteryBallsById.findIndex(o => o._id === newFeedItem.balls._id)
                        if (ballIndex > -1) {
                            lotteryBallsById[ballIndex] = subscriptionData.data.subscribeDraw.balls
                        }
                        return {
                            lotteryBallsById: [...lotteryBallsById]
                        }
                    }
                    else if (newFeedItem.origin === 'remove') {
                        let { lotteryBallsById } = prev
                        const ballIndex = lotteryBallsById.findIndex(o => o._id === newFeedItem.balls._id)
                        if (ballIndex > -1) {
                            lotteryBallsById = lotteryBallsById.filter(o => o._id !== newFeedItem.balls._id)
                        }
                        return {
                            lotteryBallsById: [...lotteryBallsById]
                        }
                    }
                    else if (newFeedItem.origin === 'new') {
                        if (prev.lotteryBallsById.findIndex(o => o._id === newFeedItem.balls._id) > -1)
                            return prev
                        return Object.assign({}, {
                            lotteryBallsById: [newFeedItem, ...prev.lotteryBallsById]
                        });
                    }
                }
            })
            client.onResetStore(unsubscribeInfo)
        } catch (error) {
            console.log('error subscribing order', error.message)
        }

    }

    function LotteryHeader(latest) {
        return (
            <>
                <View style={styles.headerStyles}>
                    <TextDefault textColor={colors.fontWhite} H3 center>
                        {'Latest Result'}
                    </TextDefault>
                </View>
                <LotteryCard {...latest} />
                <View style={styles.seperator} />
                <View style={styles.headerStyles}>
                    <TextDefault textColor={colors.fontWhite} H3 center>
                        {'Previous Result'}
                    </TextDefault>
                </View>
            </>
        )
    }

    if (loading) return <Spinner />
    if (error) return <TextError text={error.message} />
    if (data.lotteryBallsById.length < 1) return <TextError text={"Data is not available now."} />

    const latest = data.lotteryBallsById.slice(0, 1)
    const previous = data.lotteryBallsById.slice(1)
    return (
        <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.flex}>
            <FlatList
                data={data ? previous : []}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item._id}
                style={styles.flex}
                refreshing={networkStatus === 4}
                onRefresh={() => refetch()}
                ListHeaderComponent={LotteryHeader(latest[0])}
                ItemSeparatorComponent={() => <View style={styles.seperator} />}
                contentContainerStyle={[styles.mainBackground, styles.mainContainer]}
                renderItem={({ item }) => (
                    <LotteryCard {...item} />
                )}
            />
        </SafeAreaView>
    );
}
export default React.memo(Lottery)
