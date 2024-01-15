import React from "react";
import ScreenComponent from "../components/ScreenComponent";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screen/home/HomeScreen";
import NotificationScreen from "../screen/home/NotificationScreen";
import BookScreen from "../screen/home/BookScreen";
import TicketScreen from "../screen/home/TicketScreen";
import PaymentScreen from "../screen/home/PaymentScreen";
import SearchTicketResultScreen from "../screen/home/SearchTicketResultScreen";
import colors from "../config/colors";
import ConfirmBookingScreen from "../screen/home/ConfirmBookingScreen";
import TransactionDetailsScreen from "../screen/home/TransactionDetailsScreen";
import ETicketScreen from "../screen/home/ETicketScreen";

const dataArray = [
  {
    name: "Home",
    component: HomeScreen,
    headerShown: false,
  },
  {
    name: "Notifications",
    component: NotificationScreen,
    headerShown: true,
  },
  {
    name: "Book",
    component: BookScreen,
    headerShown: true,
  },
  {
    name: "SearchTicketResult",
    component: SearchTicketResultScreen,
    headerShown: true,
  },
  {
    name: "Ticket",
    component: TicketScreen,
    headerShown: true,
  },
  {
    name: "ConfirmBooking",
    component: ConfirmBookingScreen,
    headerShown: true,
  },
  {
    name: "Payment",
    component: PaymentScreen,
    headerShown: true,
  },
  {
    name: "TransactionDetails",
    component: TransactionDetailsScreen,
    headerShown: true,
  },
  {
    name: "ETicketScreen",
    component: ETicketScreen,
    headerShown: true,
  },
];

const HomeNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primaryButton,
        },
        headerTintColor: "white",
        headerTitleAlign: "center",
      }}
    >
      {dataArray.map((data) => (
        <Stack.Screen
          options={{
            headerShown: data.headerShown,
          }}
          name={data.name}
          component={data.component}
        />
      ))}
    </Stack.Navigator>
  );
};

export default HomeNavigator;
