import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import navigationTheme from "./app/navigator/navigationTheme";
import OnBoarding from "./app/navigator/OnBoardingNavigator";

export default function App() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar style="auto" />
      <OnBoarding />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
