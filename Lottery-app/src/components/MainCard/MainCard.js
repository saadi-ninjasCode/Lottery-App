import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { AdMobInterstitial, AdMobRewarded } from "expo-ads-admob";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { alignment, colors, dateTransformation, getTime, scale } from "../../utilities";
import Counter from "../Counter/Counter";
import Spinner from "../Spinner/Spinner";
import { TextDefault } from "../Text";
import styles from "./styles";

function MainCard(props) {
  const [adLoading, setAdLoading] = useState(false);
  const navigation = useNavigation();

  const showInterstitial = async () => {
    setAdLoading(true);
    try {
      const isAd = await AdMobInterstitial.getIsReadyAsync();
      if (!isAd) await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
      await AdMobInterstitial.showAdAsync();
    } catch (e) {
      console.log(e);
    } finally {
      setAdLoading(false);
    }
  };

  const showAdView = async () => {
    setAdLoading(true);
    try {
      const isAd = await AdMobRewarded.getIsReadyAsync();
      if (!isAd) await AdMobRewarded.requestAdAsync({ servePersonalizedAds: true });
      await AdMobRewarded.showAdAsync();
    } catch (e) {
      console.log(e);
    } finally {
      setAdLoading(false);
    }
  };

  return (
    <TouchableOpacity
      disabled={adLoading}
      activeOpacity={0.8}
      onPress={() => {
        const isVideo = Math.floor(Math.random() * 2);
        if (isVideo) showAdView().then(() => navigation.navigate("Lottery", { lotteryId: props.lottery._id }));
        else showInterstitial().then(() => navigation.navigate("Lottery", { lotteryId: props.lottery._id }));
      }}
    >
      <View style={styles.lotteryBox}>
        <View style={styles.boxHeader}>
          <TextDefault textColor={colors.headerBackground} H3 bold center>
            {props.lottery.name}
          </TextDefault>
          <FontAwesome5 name={props.lottery.icon_name} size={scale(20)} color={colors.drawerTitleColor} />
        </View>
        <View style={styles.boxContainer}>
          <View style={styles.boxInfo}>
            <TextDefault numberOfLines={1} textColor={colors.headerText} H5 bold>
              {dateTransformation(props.draw ? props.draw.date : null, true)}
            </TextDefault>
            <TextDefault numberOfLines={1} textColor={colors.headerText} style={alignment.MTxSmall}>
              {getTime(props.draw ? props.draw.date : null)}{" "}
              <TextDefault numberOfLines={1} textColor={colors.fontSecondColor} small>
                {" "}
                {" (Europe/London)"}
              </TextDefault>
            </TextDefault>
            <View style={styles.lotteryBalls}>
              {props.draw &&
                (props.draw.pending ? (
                  <TextDefault textColor={colors.yellow} H4 bold>
                    {"Result Pending"}
                  </TextDefault>
                ) : (
                  <>
                    {props.draw.balls.filter(Boolean).map((item, index) => (
                      <View style={[styles.ballContainer, { backgroundColor: colors.yellow }]} key={index}>
                        <TextDefault style={styles.font} textColor={colors.headerBackground} bold H4 center>
                          {item}
                        </TextDefault>
                      </View>
                    ))}
                    {props.draw.specialBalls.filter(Boolean).map((item, index) => (
                      <View style={[styles.ballContainer, { backgroundColor: colors.green }]} key={index}>
                        <TextDefault style={styles.font} textColor={colors.headerBackground} bold H4 center>
                          {item}
                        </TextDefault>
                      </View>
                    ))}
                  </>
                ))}
            </View>
          </View>
        </View>
        <Counter time={props.lottery.next_draw} />
      </View>
      {adLoading && (
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        >
          <Spinner backColor="rgba(0,0,0,0.04)" spinnerColor="white" />
        </View>
      )}
    </TouchableOpacity>
  );
}
export default React.memo(MainCard);
