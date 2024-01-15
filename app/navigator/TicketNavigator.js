import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CancelledTicket from "../screen/ticket/CancelledTicket";
import CompletedTicket from "../screen/ticket/CompletedTicket";
import ActiveTicket, {
  TicketTabNavigator,
} from "../screen/ticket/ActiveTicket";
import colors from "../config/colors";

const TicketNavigator = () => {
  const Stack = createStackNavigator();
  const dataArray = [
    {
      name: "ActiveTicket",
      component: TicketTabNavigator,
    },
    {
      name: "CompletedTicket",
      component: CompletedTicket,
    },
    {
      name: "CancelledTicket",
      component: CancelledTicket,
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
      }}
    >
      {dataArray.map((data) => (
        <Stack.Screen
          options={{
            headerShown: true,
          }}
          name={data.name}
          component={data.component}
        />
      ))}
    </Stack.Navigator>
  );
};

export default TicketNavigator;

const styles = StyleSheet.create({});
