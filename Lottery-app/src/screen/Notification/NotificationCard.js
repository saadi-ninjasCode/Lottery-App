import { gql, useMutation } from "@apollo/client";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import React, { useContext } from "react";
import { Linking, TouchableOpacity, View } from "react-native";
import { profile, updateNotificationStatus } from "../../apollo/server";
import { Checkbox, FlashMessage, Spinner, TextDefault } from "../../components";
import UserContext from "../../context/User";
import { alignment, colors } from "../../utilities";
import styles from "./styles";

const PROFILE = gql`
  ${profile}
`;
const UPDATE_NOTIFICATION_TOKEN = gql`
  ${updateNotificationStatus}
`;

function NotificationCard(props) {
  const { profile } = useContext(UserContext);
  const [mutate, { loading }] = useMutation(UPDATE_NOTIFICATION_TOKEN, {
    onCompleted,
    onError,
    refetchQueries: [{ query: PROFILE }],
  });

  function onCompleted() {}
  function onError(error) {
    console.log(error);
  }

  async function getPermission() {
    const { status } = await Notifications.getPermissionsAsync();
    return status;
  }

  async function updateNotificationStatus() {
    if (Constants.isDevice) {
      const permission = await getPermission();
      if (!profile.notificationToken || permission !== "granted") {
        Linking.openSettings();
      }
      await mutate({
        variables: {
          lotteryID: props._id.toString(),
        },
      });
    } else {
      FlashMessage({
        message: "Notification do not work on simulator",
      });
      return;
    }
  }
  return (
    <TouchableOpacity
      disabled={loading}
      activeOpacity={0.7}
      onPress={() => {
        if (!loading) updateNotificationStatus();
      }}
      style={[styles.notificationContainer, styles.shadow]}
    >
      <View style={styles.notificationChekboxContainer}>
        <Checkbox checked={profile.lotteries.some((user) => user === props._id.toString())} />
        <TextDefault numberOfLines={1} textColor={colors.statusSecondColor} style={alignment.MLsmall}>
          {" "}
          Receive Notification for {props.name}
        </TextDefault>
      </View>
      {loading && (
        <View>
          <Spinner size="small" backColor="transparent" />
        </View>
      )}
    </TouchableOpacity>
  );
}

export default React.memo(NotificationCard);
