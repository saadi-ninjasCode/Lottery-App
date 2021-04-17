import { gql, useApolloClient, useQuery } from "@apollo/client";
import { useRoute } from "@react-navigation/native";
import { AdMobBanner } from "expo-ads-admob";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import getEnvVars from "../../../environment";
import { ballsById, SubscribeLotteryBalls } from "../../apollo/server";
import { LotteryCard, Spinner, TextDefault, TextError } from "../../components";
import { alignment, colors } from "../../utilities";
import styles from "./styles";

const { AD_MOB_BANNER } = getEnvVars();

const LOTTERY_DRAW = gql`
  ${ballsById}
`;
const SUBSCRIPTION_INFO = gql`
  ${SubscribeLotteryBalls}
`;
const size = 3;
function Lottery() {
  const flatlistRef = useRef(null);
  const [page, setPage] = useState(0);
  const client = useApolloClient();
  const route = useRoute();
  const lotteryId = route.params?.lotteryId ?? null;
  const { data, loading, error, refetch, networkStatus, fetchMore, subscribeToMore } = useQuery(LOTTERY_DRAW, {
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
    variables: { id: lotteryId, page: page, rows: size },
  });
  const isData = Boolean(data?.lotteryBallsById?.draws?.length);

  useEffect(() => {
    subscribeBall();
  }, []);
  function subscribeBall() {
    try {
      const unsubscribeInfo = subscribeToMore({
        document: SUBSCRIPTION_INFO,
        variables: { id: lotteryId },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newFeedItem = subscriptionData.data.subscribeDraw;
          if (newFeedItem.origin === "edit") {
            let { lotteryBallsById } = prev;
            const ballIndex = lotteryBallsById.findIndex((o) => o._id === newFeedItem.balls._id);
            if (ballIndex > -1) {
              lotteryBallsById[ballIndex] = subscriptionData.data.subscribeDraw.balls;
            }
            return {
              lotteryBallsById: [...lotteryBallsById],
            };
          } else if (newFeedItem.origin === "remove") {
            let { lotteryBallsById } = prev;
            const ballIndex = lotteryBallsById.findIndex((o) => o._id === newFeedItem.balls._id);
            if (ballIndex > -1) {
              lotteryBallsById = lotteryBallsById.filter((o) => o._id !== newFeedItem.balls._id);
            }
            return {
              lotteryBallsById: [...lotteryBallsById],
            };
          } else if (newFeedItem.origin === "new") {
            if (prev.lotteryBallsById.findIndex((o) => o._id === newFeedItem.balls._id) > -1) return prev;
            return Object.assign(
              {},
              {
                lotteryBallsById: [newFeedItem, ...prev.lotteryBallsById],
              }
            );
          }
        },
      });
      client.onResetStore(unsubscribeInfo);
    } catch (error) {
      console.log("error subscribing order", error.message);
    }
  }

  const refreshPage = useCallback(() => {
    refetch({
      page: 0,
      size: size,
    });
  }, [refetch, size]);

  const fetchList = async (pageNo, initial = false) => {
    if (data.lotteryBallsById.draws.length !== data?.lotteryBallsById.totalRecords) {
      fetchMore({
        variables: { id: lotteryId, page: page, rows: size },
      }).then((fetchMoreResult) => {
        setPage((prev) => prev + 1);
      });
    }
  };

  function LotteryHeader(latest) {
    return (
      <>
        <AdMobBanner
          style={alignment.MBmedium}
          bannerSize="fullBanner"
          adUnitID={AD_MOB_BANNER} // Test ID, Replace with your-admob-unit-id
          servePersonalizedAds
        />
        <View style={styles.headerStyles}>
          <TextDefault textColor={colors.fontWhite} H3 center>
            {"Latest Result"}
          </TextDefault>
        </View>
        <LotteryCard {...latest} />
        <View style={styles.seperator} />
        <View style={styles.headerStyles}>
          <TextDefault textColor={colors.fontWhite} H3 center>
            {"Previous Result"}
          </TextDefault>
        </View>
      </>
    );
  }

  if (loading && !isData) return <Spinner />;
  if (error) return <TextError text={error.message} />;
  if (data?.lotteryBallsById.draws.length < 1) return <TextError text={"Data is not available now."} />;

  const latest = data.lotteryBallsById.draws.slice(0, 1);
  const previous = data.lotteryBallsById.draws.slice(1);
  return (
    <SafeAreaView edges={["bottom", "left", "right"]} style={styles.flex}>
      <FlatList
        ref={flatlistRef}
        data={data ? previous : []}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        style={styles.flex}
        refreshing={page === 0 ? networkStatus === 4 : networkStatus === 3}
        onRefresh={() => refreshPage()}
        onEndReachedThreshold={0.01}
        onEndReached={() => !loading && fetchList(1)}
        ListHeaderComponent={LotteryHeader(latest[0])}
        ItemSeparatorComponent={() => <View style={styles.seperator} />}
        contentContainerStyle={[styles.mainBackground, styles.mainContainer]}
        ListFooterComponent={
          loading && Boolean(flatlistRef.current) ? (
            <View style={[alignment.MTmedium, alignment.MBmedium]}>
              <Spinner />
            </View>
          ) : null
        }
        renderItem={({ item }) => <LotteryCard {...item} />}
      />
    </SafeAreaView>
  );
}
export default React.memo(Lottery);
