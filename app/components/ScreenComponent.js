import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import colors from "../config/colors";

const ScreenComponent = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={Platform.OS ? colors.primaryButton : "White"}
        barStyle={Platform.OS ? "light-content" : "dark-content"}
      />
      <ScrollView>{children}</ScrollView>
    </SafeAreaView>
  );
};

export default ScreenComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
