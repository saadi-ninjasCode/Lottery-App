import React, { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './styles';
import { Spinner, TextError, MainCard } from '../../components'
import { colors } from '../../utilities';
import { gql, useQuery, useApolloClient } from '@apollo/client';
import { dashboardInfo, SubscribeDashboardInfo } from '../../apollo/server';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const LOTTERY = gql`${dashboardInfo}`
const SUBSCRIPTION_INFO = gql`${SubscribeDashboardInfo}`

function Main() {
  const client = useApolloClient()
  const navigation = useNavigation()
  const { data: LotteryData, loading, error, refetch, networkStatus, subscribeToMore } = useQuery(LOTTERY, { fetchPolicy: 'network-only' })

  useEffect(() => {
    subscribeDashboard()
  }, [])

  if (loading) return < Spinner />
  if (error) return <TextError text={error.message} textColor={colors.headerBackground} />

  function subscribeDashboard() {
    try {
      const unsubscribeInfo = subscribeToMore({
        document: SUBSCRIPTION_INFO,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data)
            return prev
          const newFeedItem = subscriptionData.data.subscribeDashBoard;
          if (newFeedItem.origin === 'edit') {
            let { dasboardInfo } = prev
            const lotteryIndex = dasboardInfo.findIndex(o => o.lottery._id === newFeedItem.balls.lottery._id)
            if (lotteryIndex > -1) {
              dasboardInfo[lotteryIndex] = subscriptionData.data.subscribeDashBoard.balls
            }
            return {
              dasboardInfo: [...dasboardInfo]
            }
          }
          else if (newFeedItem.origin === 'new') {
            let { dasboardInfo } = prev
            const lotteryIndex = dasboardInfo.findIndex(o => ((o.lottery._id === newFeedItem.balls.lottery._id) && (o.draw._id !== newFeedItem.balls.draw._id)))
            if (lotteryIndex > -1) {
              dasboardInfo = dasboardInfo.map((data, index) => {
                if (index === lotteryIndex) {
                  return subscriptionData.data.subscribeDashBoard.balls
                } else {
                  return data
                }
              })
            }
            return {
              dasboardInfo: [...dasboardInfo]
            }
          }
          else if (newFeedItem.origin === 'remove') {
            let { dasboardInfo } = prev
            const lotteryIndex = dasboardInfo.findIndex(o => ((o.lottery._id === newFeedItem.balls.lottery._id) && (o.draw._id !== newFeedItem.balls.draw._id)))
            if (lotteryIndex > -1) {
              dasboardInfo = dasboardInfo.map((data, index) => {
                if (index === lotteryIndex) {
                  return subscriptionData.data.subscribeDashBoard.balls
                } else {
                  return data
                }
              })
            }
            return {
              dasboardInfo: [...dasboardInfo]
            }
          }
        }
      })
      client.onResetStore(unsubscribeInfo)
    } catch (error) {
      console.log('error subscribing order', error.message)
    }
  }
  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.flex}>
      <FlatList
        data={LotteryData ? LotteryData.dasboardInfo : []}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.lottery._id}
        style={styles.flex}
        refreshing={networkStatus === 4}
        onRefresh={() => refetch()}
        ItemSeparatorComponent={() => <View style={styles.seperator} />}
        contentContainerStyle={[styles.mainBackground, styles.mainContainer]}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Lottery', { lotteryId: item.lottery._id })}
          >
            <MainCard {...item} />
          </TouchableOpacity>
        )}
      />

    </SafeAreaView>
  );
}

export default React.memo(Main)
