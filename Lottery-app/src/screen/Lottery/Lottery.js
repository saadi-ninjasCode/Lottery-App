import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery, gql, NetworkStatus } from '@apollo/client';
import { Spinner, TextError, LotteryCard, TextDefault } from '../../components';
import { ballsById } from '../../apollo/server'
import { FlatList } from 'react-native-gesture-handler';
import { colors } from '../../utilities';

const LOTTERY_DRAW = gql`${ballsById}`
function Lottery() {
    const route = useRoute()
    const lotteryId = route.params?.lotteryId ?? null
    const { data, loading, refetch, error } = useQuery(LOTTERY_DRAW, { variables: { id: lotteryId } })

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
                refreshing={NetworkStatus === 4}
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
