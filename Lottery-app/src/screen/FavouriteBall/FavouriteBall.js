import { gql, useQuery } from "@apollo/client";
import { AdMobBanner } from "expo-ads-admob";
import React from "react";
import { SectionList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import getEnvVars from "../../../environment";
import { favouriteBall } from "../../apollo/server";
import { Spinner, TextDefault, TextError } from "../../components";
import { alignment, colors } from "../../utilities";
import styles from "./styles";

const { AD_MOB_BANNER } = getEnvVars();

const FAV_BALLS = gql`
  ${favouriteBall}
`;

function FavouriteBall() {
  const { data, loading, error } = useQuery(FAV_BALLS);

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
              {data.array.length > 0 &&
                data.array.map((objBall, i) => (
                  <View style={{ justifyContent: "center", alignItems: "center" }} key={i}>
                    <View style={[styles.ballContainer, { backgroundColor: data.color }]}>
                      <TextDefault textColor={colors.fontWhite} bold H3 center>
                        {objBall.ball}
                      </TextDefault>
                    </View>
                    <TextDefault textColor={colors.facebook} bold H4>
                      {objBall.times}
                      {" times"}
                    </TextDefault>
                  </View>
                ))}
            </View>
          </View>
        </View>
      </View>
    );
  }

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
  if (loading) return <Spinner />;
  if (error) return <TextError text={error.message} />;
  const filter = data.lottery.filter((c) => c.coldBall.length);
  const sectionData = filter.map((item, index) => ({
    name: item.name,
    data: [{ hotBall: item.hotBall, coldBall: item.coldBall }],
    index,
  }));

  return (
    <SafeAreaView edges={["bottom", "left", "right"]} styles={[styles.flex, styles.mainBackground]}>
      <SectionList
        style={{ flexGrow: 1 }}
        contentContainerStyle={{ ...alignment.PTmedium }}
        sections={sectionData}
        keyExtractor={(item, index) => index}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={AdContainer}
        renderItem={({ item, index, section }) => (
          <>
            <Balls name="Cold Balls" color={colors.facebook} array={item.coldBall} />
            <Balls name="Hot Balls" color={colors.google} array={item.hotBall} />
          </>
        )}
      />
    </SafeAreaView>
  );
}
export default React.memo(FavouriteBall);
