import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screen/LoginScreen";
import RegisterScreen from "../screen/RegisterScreen";
import OnBoardingScreen from "../screen/OnBoardingScreen";
import HeroScreen from "../screen/HeroScreen";
import colors from "../config/colors";
import TabNavigator from "./TabNavigator";

const OnBoarding = () => {
  const Stack = createStackNavigator();

  const screenPages = [
    {
      name: "OnBoarding",
      component: OnBoardingScreen,
      headerShown: false,
    },
    {
      name: "Hero",
      component: HeroScreen,
      headerShown: false,
    },
    {
      name: "Login",
      component: LoginScreen,
      headerShown: true,
    },
    {
      name: "Register",
      component: RegisterScreen,
      headerShown: true,
    },
  ];
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primaryButton,
        },
        headerTitleStyle: {
          color: "white",
        },
        headerTintColor: "white",
        headerTitleAlign: "center",
      }}
    >
      {screenPages.map((screenPage) => (
        <Stack.Screen
          options={{
            headerShown: screenPage.headerShown,
          }}
          name={screenPage.name}
          component={screenPage.component}
        />
      ))}
    </Stack.Navigator>
  );
};

export default OnBoarding;
