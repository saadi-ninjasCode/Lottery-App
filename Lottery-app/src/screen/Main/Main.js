import React from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './styles';
import { Spinner, TextError, MainCard } from '../../components'
import { colors } from '../../utilities';
import { gql, useQuery } from '@apollo/client';
import { dashboardInfo } from '../../apollo/server';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const LOTTERY = gql`${dashboardInfo}`

function Main() {
  const navigation = useNavigation()
  const { data: LotteryData, loading, error, refetch, networkStatus } = useQuery(LOTTERY, { fetchPolicy: 'network-only' })
  if (loading) return < Spinner />
  if (error) return <TextError text={error.message} textColor={colors.headerBackground} />
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
