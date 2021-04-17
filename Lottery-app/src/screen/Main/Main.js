import { gql, useApolloClient, useQuery } from "@apollo/client";
import { AdMobBanner, AdMobInterstitial, AdMobRewarded } from "expo-ads-admob";
import React, { useEffect } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import getEnvVars from "../../../environment";
import { dashboardInfo, SubscribeDashboardInfo } from "../../apollo/server";
import { MainCard, Spinner, TextError } from "../../components";
import { colors } from "../../utilities";
import styles from "./styles";

const { AD_MOB_BANNER, AD_MOB_INTERSTITIAL, AD_MOB_REWARDED } = getEnvVars();

const LOTTERY = gql`
  ${dashboardInfo}
`;
const SUBSCRIPTION_INFO = gql`
  ${SubscribeDashboardInfo}
`;

function Main() {
  const client = useApolloClient();

  const { data: LotteryData, loading, error, refetch, networkStatus, subscribeToMore } = useQuery(LOTTERY, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    setAdIds().catch((e) => console.log(e));
    subscribeDashboard();
  }, []);

  const setAdIds = async () => {
    await AdMobInterstitial.setAdUnitID(AD_MOB_INTERSTITIAL);
    await AdMobRewarded.setAdUnitID(AD_MOB_REWARDED);
    await AdMobRewarded.requestAdAsync({ servePersonalizedAds: true });
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
  };

  if (loading) return <Spinner />;
  if (error) return <TextError text={error.message} textColor={colors.headerBackground} />;

  function subscribeDashboard() {
    try {
      const unsubscribeInfo = subscribeToMore({
        document: SUBSCRIPTION_INFO,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newFeedItem = subscriptionData.data.subscribeDashBoard;
          if (newFeedItem.origin === "edit") {
            let { dasboardInfo } = prev;
            const lotteryIndex = dasboardInfo.findIndex((o) => o.lottery._id === newFeedItem.balls.lottery._id);
            if (lotteryIndex > -1) {
              dasboardInfo[lotteryIndex] = subscriptionData.data.subscribeDashBoard.balls;
            }
            return {
              dasboardInfo: [...dasboardInfo],
            };
          } else if (newFeedItem.origin === "new") {
            let { dasboardInfo } = prev;
            const lotteryIndex = dasboardInfo.findIndex(
              (o) => o.lottery._id === newFeedItem.balls.lottery._id && o.draw._id !== newFeedItem.balls.draw._id
            );
            if (lotteryIndex > -1) {
              dasboardInfo = dasboardInfo.map((data, index) => {
                if (index === lotteryIndex) {
                  return subscriptionData.data.subscribeDashBoard.balls;
                } else {
                  return data;
                }
              });
            }
            return {
              dasboardInfo: [...dasboardInfo],
            };
          } else if (newFeedItem.origin === "remove") {
            let { dasboardInfo } = prev;
            const lotteryIndex = dasboardInfo.findIndex(
              (o) => o.lottery._id === newFeedItem.balls.lottery._id && o.draw._id !== newFeedItem.balls.draw._id
            );
            if (lotteryIndex > -1) {
              dasboardInfo = dasboardInfo.map((data, index) => {
                if (index === lotteryIndex) {
                  return subscriptionData.data.subscribeDashBoard.balls;
                } else {
                  return data;
                }
              });
            }
            return {
              dasboardInfo: [...dasboardInfo],
            };
          }
        },
      });
      client.onResetStore(unsubscribeInfo);
    } catch (error) {
      console.log("error subscribing order", error.message);
    }
  }
  return (
    <SafeAreaView edges={["bottom", "left", "right"]} style={styles.flex}>
      <AdMobBanner
        bannerSize="fullBanner"
        adUnitID={AD_MOB_BANNER} // Test ID, Replace with your-admob-unit-id
        servePersonalizedAds
      />
      <FlatList
        data={LotteryData ? LotteryData.dasboardInfo : []}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.lottery._id}
        style={styles.flex}
        refreshing={networkStatus === 4}
        onRefresh={() => refetch()}
        ItemSeparatorComponent={() => <View style={styles.seperator} />}
        contentContainerStyle={[styles.mainBackground, styles.mainContainer]}
        renderItem={({ item }) => <MainCard {...item} />}
      />
    </SafeAreaView>
  );
}

export default React.memo(Main);
