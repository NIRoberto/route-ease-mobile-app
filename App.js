import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import navigationTheme from "./app/navigator/navigationTheme";
import OnBoarding from "./app/navigator/OnBoardingNavigator";
import { useContext } from "react";
import TabNavigator from "./app/navigator/TabNavigator";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import AppProvider from "./app/context/AppProvider";
import AppContext from "./app/context/context";
// import {
//   QueryClient,
//   QueryClientProvider,
//   useQuery,
// } from "@tanstack/react-query";

const AllScreen = () => {
  const { user } = useContext(AppContext);

  return <>{user ? <TabNavigator /> : <OnBoarding />}</>;
};
export default function App() {
  // console.log(ticketsData);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <NavigationContainer theme={navigationTheme}>
          <StatusBar style="auto" />
          <AllScreen />
        </NavigationContainer>
      </AppProvider>
    </QueryClientProvider>
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
