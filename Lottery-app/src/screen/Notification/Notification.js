import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList } from 'react-native-gesture-handler'
import { Spinner, TextError } from '../../components'
import { colors } from '../../utilities';
import { gql, useQuery } from '@apollo/client';
import { getLotteryName } from '../../apollo/server';
import NotificationCard from './NotificationCard';

const LOTTERY = gql`${getLotteryName}`

function Notification() {
  const { data, loading: dataLoading, error } = useQuery(LOTTERY)
  if (dataLoading) return <Spinner />
  if (error) return <TextError text={error.message} textColor={colors.headerBackground} />
  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.flex}>
      <View style={styles.flex}>
        <FlatList
          data={data ? data.lottery : []}
          style={[styles.flex, styles.mainBackground]}
          contentContainerStyle={styles.scrollContent}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <NotificationCard
                {...item} />
            )
          }
          }
        />
      </View>
    </SafeAreaView>
  );
}
export default React.memo(Notification)