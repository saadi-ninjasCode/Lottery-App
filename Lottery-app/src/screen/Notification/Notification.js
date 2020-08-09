import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler'
import { TextDefault, Spinner, Checkbox, TextError } from '../../components'
import { colors, alignment } from '../../utilities';
import { gql, useQuery } from '@apollo/client';
import { getLotteryName } from '../../apollo/server';

const LOTTERY = gql`${getLotteryName}`

export default function Notification() {
  const { data, loading: dataLoading, error } = useQuery(LOTTERY)
  const loading = false

  if (dataLoading) return <Spinner />
  if (error) return <TextError text={error.message} textColor={colors.headerBackground} />

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.flex}>
      <FlatList
        data={data ? data.lottery : []}
        style={[styles.flex, styles.mainBackground]}
        contentContainerStyle={styles.scrollContent}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (

          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.notificationContainer, styles.shadow]}>
            <View style={styles.notificationChekboxContainer}>
              <Checkbox
                checked={true}
              />
              <TextDefault
                numberOfLines={1}
                textColor={colors.statusSecondColor}
                style={alignment.MLsmall}>
                {' '}Receive Notification for {item.name}
              </TextDefault>
            </View>
            {loading && (
              <View>
                <Spinner size="small" backColor="transparent" />
              </View>
            )}
          </TouchableOpacity>
        )}
      />

    </SafeAreaView>
  );
}


