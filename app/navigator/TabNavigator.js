import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigator from "./HomeNavigator";
import TicketNavigator from "./TicketNavigator";
import AccountNavigator from "./AccountNavigator";

import { Ionicons } from "@expo/vector-icons";
import colors from "../config/colors";

const dataArray = [
  {
    name: "Home",
    component: HomeNavigator,
    headerShown: false,
  },
  {
    name: "Ticket",
    component: TicketNavigator,
    headerShown: false,
  },
  {
    name: "Account",
    component: AccountNavigator,
    headerShown: true,
  },
];
const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Ticket") {
            iconName = focused ? "bookmarks" : "bookmarks-outline";
          } else if (route.name === " Account") {
            iconName = focused ? "settings" : "settings-outline";
          } else {
            iconName = focused ? "wallet" : "wallet-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "white",
        tabBarActiveBackgroundColor: colors.primaryButton,
        tabBarInactiveTintColor: "black",
        headerShown: false,
      })}
    >
      {dataArray.map((data) => (
        <Tab.Screen
          name={data.name}
          component={data.component}
          options={{
            headerShown: data.headerShown,
            headerBackground: () => (
              <View
                style={{
                  backgroundColor: colors.primaryButton,
                  height: 100,
                }}
              />
            ),
            title: data.name,
            headerTitleStyle: {
              color: "white",
              textAlign: "center",
              paddingTop: 15,
            },
            justifyContent: "center",
            headerTitleAlign: "center",
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});
