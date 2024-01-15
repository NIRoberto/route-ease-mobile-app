import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Screen from "../components/ScreenComponent";
import AppText from "../components/typo/AppText";
import colors from "../config/colors";
import AppButton from "../components/forms/AppButton";
import { useNavigation } from "@react-navigation/native";

const HeroScreen = () => {
  const navigation = useNavigation();

  return (
    <Screen>
      <View style={styles.container}>
        <Image source={require("../assets/icon.png")} style={styles.image} />
        <AppText
          text="
           Route Ease ticket booking app
          "
          color={colors.primaryText}
          bold={false}
          size={25}
        />
        <AppText
          text="Welcome to Route Easy – Your Journey Starts Here. 
          Effortless bookings, real-time updates. Travel smart, travel easy with us."
          size={15}
          center={true}
        />
        <View style={styles.buttons}>
          <AppButton
            title={"Login"}
            color={"white"}
            bold={false}
            bgColor={colors.primaryButton}
            handlePress={() => navigation.navigate("Login")}
          />
          {/* or text */}

          <AppText
            text={"or"}
            center={true}
            color={colors.primaryText}
            bold={false}
          />
          <AppButton
            handlePress={() => navigation.navigate("Register")}
            bold={true}
            title={"Register"}
            bgColor={"white"}
          />
        </View>
      </View>
    </Screen>
  );
};

export default HeroScreen;

const styles = StyleSheet.create({
  buttons: {
    width: "100%",
    justifyContent: "center",
    gap: 10,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    margin: 10,
    gap: 40,
  },
  image: {
    width: 100,
    height: 100,
  },
});
