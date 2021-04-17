import { AdMobBanner } from "expo-ads-admob";
import React, { useRef, useState } from "react";
import { View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import getEnvVars from "../../../environment";
import { TextDefault } from "../../components";
import { colors } from "../../utilities";
import styles from "./styles";

const { AD_MOB_BANNER } = getEnvVars();

function Generator() {
  const [ball1, setBall1] = useState("?");
  const [ball2, setBall2] = useState("?");
  const [ball3, setBall3] = useState("?");
  const [ball4, setBall4] = useState("?");
  const [ball5, setBall5] = useState("?");
  const [ball6, setBall6] = useState("?");
  const [ball7, setBall7] = useState("?");
  let timer = useRef();

  function generate() {
    const id = setInterval(() => wait(), 50);
    timer.current = id;
    setTimeout(() => {
      clearInterval(timer.current);
    }, 2000);
  }
  function wait() {
    setBall1(Math.floor(Math.random() * 49) + 1);
    setBall2(Math.floor(Math.random() * 49) + 1);
    setBall3(Math.floor(Math.random() * 49) + 1);
    setBall4(Math.floor(Math.random() * 49) + 1);
    setBall5(Math.floor(Math.random() * 49) + 1);
    setBall6(Math.floor(Math.random() * 49) + 1);
    setBall7(Math.floor(Math.random() * 49) + 1);
  }
  return (
    <SafeAreaView style={[styles.flex, styles.mainBackground]}>
      <View style={styles.box}>
        <View style={styles.header}>
          <TextDefault textColor={colors.headerBackground} H4 bold center>
            {"Number Generator"}
          </TextDefault>
        </View>
        <View style={styles.boxContainer}>
          <View style={styles.boxInfo}>
            <View style={styles.lotteryBalls}>
              <View style={styles.ballContainer}>
                <TextDefault style={styles.font} textColor={colors.headerBackground} bold H4 center>
                  {ball1}
                </TextDefault>
              </View>
              <View style={styles.ballContainer}>
                <TextDefault style={styles.font} textColor={colors.headerBackground} bold H4 center>
                  {ball2}
                </TextDefault>
              </View>
              <View style={styles.ballContainer}>
                <TextDefault style={styles.font} textColor={colors.headerBackground} bold H4 center>
                  {ball3}
                </TextDefault>
              </View>
              <View style={styles.ballContainer}>
                <TextDefault style={styles.font} textColor={colors.headerBackground} bold H4 center>
                  {ball4}
                </TextDefault>
              </View>
              <View style={styles.ballContainer}>
                <TextDefault style={styles.font} textColor={colors.headerBackground} bold H4 center>
                  {ball5}
                </TextDefault>
              </View>
              <View style={styles.ballContainer}>
                <TextDefault style={styles.font} textColor={colors.headerBackground} bold H4 center>
                  {ball6}
                </TextDefault>
              </View>
              <View style={styles.ballContainer}>
                <TextDefault style={styles.font} textColor={colors.headerBackground} bold H4 center>
                  {ball7}
                </TextDefault>
              </View>
            </View>
            <RectButton style={styles.btn} onPress={() => generate()}>
              <TextDefault textColor={colors.white} H4>
                {"Generate"}
              </TextDefault>
            </RectButton>
          </View>
        </View>
      </View>
      <View style={styles.adContainer}>
        <AdMobBanner
          bannerSize="mediumRectangle"
          adUnitID={AD_MOB_BANNER} // Test ID, Replace with your-admob-unit-id
          servePersonalizedAds
        />
      </View>
    </SafeAreaView>
  );
}
export default React.memo(Generator);
