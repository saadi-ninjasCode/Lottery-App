import { gql, useQuery } from "@apollo/client";
import { AdMobBanner } from "expo-ads-admob";
import React from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import getEnvVars from "../../../environment";
import { getLotteryName } from "../../apollo/server";
import { Spinner, TextError } from "../../components";
import { colors } from "../../utilities";
import NotificationCard from "./NotificationCard";
import styles from "./styles";

const { AD_MOB_BANNER } = getEnvVars();

const LOTTERY = gql`
  ${getLotteryName}
`;

function Notification() {
  const { data, loading: dataLoading, error } = useQuery(LOTTERY);

  function AdContainer() {
    return (
      <View style={styles.adContainer}>
        <AdMobBanner
          bannerSize="mediumRectangle"
          adUnitID={AD_MOB_BANNER} // Test ID, Replace with your-admob-unit-id
          servePersonalizedAds
        />
      </View>
    );
  }

  if (dataLoading) return <Spinner />;
  if (error) return <TextError text={error.message} textColor={colors.headerBackground} />;
  return (
    <SafeAreaView edges={["bottom", "left", "right"]} style={styles.flex}>
      <View style={styles.flex}>
        <FlatList
          data={data ? data.lottery : []}
          style={[styles.flex, styles.mainBackground]}
          contentContainerStyle={styles.scrollContent}
          ListFooterComponent={AdContainer}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return <NotificationCard {...item} />;
          }}
        />
      </View>
    </SafeAreaView>
  );
}
export default React.memo(Notification);
