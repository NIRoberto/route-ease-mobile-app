import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screen/account/AccountScreen";

const AccountNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Account"
        component={AccountScreen}
      />
    </Stack.Navigator>
  );
};

export default AccountNavigator;

const styles = StyleSheet.create({});
