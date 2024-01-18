import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import Onboarding from "react-native-onboarding-swiper";
import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";

const doneBtn = ({ ...props }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("Hero")}>
      <View
        style={{
          marginHorizontal: 10,
          backgroundColor: "white",
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderRadius: 10,
        }}
      >
        <Text style={{ fontSize: 16, color: colors.primaryButton }}>Done</Text>
      </View>
    </TouchableOpacity>
  );
};

const OnBoardingLottieImageComponent = ({ image }) => {
  return (
    <View>
      <LottieView style={styles.lottie} source={image} autoPlay loop />
    </View>
  );
};

const onboardingScreens = [
  {
    key: 1,
    title: "Welcome to Your Premier Bus Ticket Booking App",
    image: (
      // Lottie animation introducing the user to the application
      <OnBoardingLottieImageComponent
        image={require("../assets/onBoarding/1.json")}
      />
    ),
    backgroundColor: colors.secondaryBackground,
    subtitle: "Embark on a seamless journey with our intuitive platform.",
  },
  {
    key: 2,
    title: "Effortless Booking - Anytime, Anywhere",
    image: (
      // Lottie animation showcasing the ease of ticket booking
      <OnBoardingLottieImageComponent
        image={require("../assets/onBoarding/map.json")}
      />
    ),
    backgroundColor: colors.primaryButton,
    subtitle: "Book your tickets with a few simple taps on your device.",
  },
  {
    key: 3,
    title: "Discover Exclusive Offers and Travel Perks",
    image: (
      // Lottie animation highlighting special discounts and features
      <OnBoardingLottieImageComponent
        image={require("../assets/onBoarding/2.json")}
      />
    ),
    backgroundColor: colors.primaryBackground,
    subtitle: "Unlock amazing deals for a delightful travel experience.",
  },
];

const OnBoardingScreen = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <Onboarding
        onDone={() => navigation.navigate("Hero")}
        onSkip={() => navigation.navigate("Hero")}
        DoneButtonComponent={doneBtn}
        bottomBarHighlight={false}
        pages={[...onboardingScreens]}
      />
    </View>
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  lottie: {
    width: Dimensions.get("window").width * 0.3,
    height: Dimensions.get("window").height * 0.3,
    borderRadius: 20,
  },
});
