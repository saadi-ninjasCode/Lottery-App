/*****************************
* environment.js
* path: '/environment.js' (root of your project)
******************************/

import Constants from "expo-constants";


const ENV = {
  development: {
    GRAPHQL_URL: "http://192.168.100.9:3000/graphql",
    ANDROID_CLIENT_ID_GOOGLE: "820349940074-vn8777vtib4uqc1igdlb57bm490f1i5b.apps.googleusercontent.com",
    IOS_CLIENT_ID_GOOGLE: "820349940074-q0ljvl6keontb09madfs7f865d0ut3li.apps.googleusercontent.com",
    FACEBOOK_APP_ID: "641882316431141"
  },
  staging: {
    ANDROID_CLIENT_ID_GOOGLE: "820349940074-vn8777vtib4uqc1igdlb57bm490f1i5b.apps.googleusercontent.com",
    IOS_CLIENT_ID_GOOGLE: "820349940074-q0ljvl6keontb09madfs7f865d0ut3li.apps.googleusercontent.com",
  },
  production: {
    ANDROID_CLIENT_ID_GOOGLE: "820349940074-vn8777vtib4uqc1igdlb57bm490f1i5b.apps.googleusercontent.com",
    IOS_CLIENT_ID_GOOGLE: "820349940074-q0ljvl6keontb09madfs7f865d0ut3li.apps.googleusercontent.com",
  }
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.
  if (__DEV__) {
    return ENV.development;
  } else if (env === 'staging') {
    return ENV.staging;
  } else if (env === 'production') {
    return ENV.production;
  }
};

export default getEnvVars;