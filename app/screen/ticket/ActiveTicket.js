import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CompletedTicket from "./CompletedTicket";
import CancelledTicket from "./CancelledTicket";
import ScreenComponent from "../../components/ScreenComponent";
import AppText from "../../components/typo/AppText";
import colors from "../../config/colors";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { API } from "../../config/axios";
import AppContext from "../../context/context";
import { useQuery } from "@tanstack/react-query";
import { capitalizeString } from "../../utils/func";

export const TicketsData = [
  {
    id: 1,
    travelAgency: {
      id: 1,
      name: "Ritco Express",
      logo: require("../../assets/agency/ritco.jpeg"),
    },
    startTime: "10:00 AM",
    endTime: "02:00 PM",
    date: "2024-01-20",
    status: "Paid",
    duration: "4h",
    origin: "Kigali",
    destination: "Gisenyi",
    user: {
      id: 1,
      fullName: "Robert Niyitanga",
      email: " robert@gmail.com",
      phone: "0787491277",
    },
  },
  {
    id: 2,
    travelAgency: {
      id: 2,
      name: "Horizon Express",
      logo: require("../../assets/agency/horizon.png"),
    },
    startTime: "10:00 AM",
    endTime: "02:00 PM",
    date: "2024-01-20",
    status: "Completed",
    duration: "4h",
    origin: "Kigali",
    destination: "Gisenyi",
    user: {
      id: 2,
      fullName: "Robert Niyitanga",
      email: "robert@gmail.com",
      phone: "0787491277",
    },
  },
];

export const TicketCard = ({
  TravelAgencyId,
  _id,
  carId,
  directionId,
  RouteId,
  departureCity,
  destinationCity,
  departureDate,
  departureTime,
  plannedSeats,
  bookedSeats,
  payedticketsbooked,
  payedSeats,
  nonPayedSeats,
  remainingNonPayedSeats,
  status,
  agents,
  createdDate,
}) => {
  const navigation = useNavigation();
  console.log(TravelAgencyId?.contactInformation);
  return (
    <TouchableOpacity
      onPress={() => {
        // navigation.navigate("Book", {
        //   data: {
        //     TravelAgencyId,
        //     _id,
        //     carId,
        //     directionId,
        //     RouteId,
        //     departureCity,
        //     destinationCity,
        //     departureDate,
        //     departureTime,
        //     plannedSeats,
        //     bookedSeats,
        //     payedSeats,
        //     nonPayedSeats,
        //     status,
        //     agents,
        //     createdDate,
        //   },
        // });
      }}
      style={{
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        backgroundColor: "white",
        borderRadius: 10,
        marginBottom: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Image
            source={{
              uri:
                TravelAgencyId?.image ||
                "https://horizonexpress.rw/wp-content/uploads/2022/02/Horizon_Express_Logo_Modified_page-0001__1_-removebg-preview.png",
            }}
            style={{ width: 50, height: 50, borderRadius: 10 }}
          />
          <View style={{ marginLeft: 10 }}>
            <AppText
              text={TravelAgencyId?.travelAgenceName}
              color={"black"}
              bold={true}
            />
            <AppText
              text={TravelAgencyId?.contactInformation}
              color={"black"}
              bold={false}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
            gap: 10,
          }}
        >
          <AppText
            text={capitalizeString(status)}
            color={"green"}
            size={14}
            bold={true}
          />
        </View>
      </View>
      <View style={{ width: "100%", alignItems: "center" }}>
        <View
          style={{
            marginLeft: 10,
            width: "100%",
            justifyContent: "space-between",
            flexDirection: "row",
            padding: 10,
          }}
        >
          <AppText
            text={capitalizeString(departureCity)}
            size={18}
            color={"black"}
            bold={true}
          />
          <AppText
            text={capitalizeString(destinationCity)}
            size={18}
            color={"black"}
            bold={false}
          />
        </View>

        <View
          style={{
            marginTop: 10,
            width: "100%",
            justifyContent: "space-between",
            flexDirection: "row",
            padding: 10,
          }}
        >
          <AppText
            text={departureTime}
            color={colors.primaryText}
            bold={true}
          />
          <AppText
            text={departureDate}
            color={colors.primaryText}
            bold={true}
          />
        </View>
        {/* <View
          style={{
            marginLeft: 10,
            width: "100%",
            justifyContent: "space-between",
            flexDirection: "row",
            padding: 10,
          }}
        >
          <AppText text={departureDate} color={"black"} bold={true} />
          <AppText text={departureDate} color={"black"} bold={false} />
        </View> */}
        <View
          style={{
            marginTop: 10,
            width: "100%",
            justifyContent: "space-between",
            flexDirection: "row",
            padding: 10,
          }}
        >
          {/* <AppText
            text={`${bookedSeats} booked seats`}
            color={"black"}
            bold={false}
          />
          <AppText
            text={`${payedSeats} payed seats`}
            color={"black"}
            bold={false}
          />
          <AppText
            text={`${nonPayedSeats} non payed seats`}
            color={"black"}
            bold={false}
          /> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const TicketTabNavigator = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.primaryButton,
        inactiveTintColor: "black",
        labelStyle: { fontSize: 16, textTransform: "capitalize" },
        style: { backgroundColor: "#FFFFFF" },
        indicatorStyle: { backgroundColor: colors.primaryButton },
      }}
    >
      <Tab.Screen name="Active" component={ActiveTicket} />
      <Tab.Screen name="Completed" component={CompletedTicket} />
      {/* <Tab.Screen name="Cancelled" component={CancelledTicket} /> */}
    </Tab.Navigator>
  );
};
const ActiveTicket = () => {
  const { tickets } = useContext(AppContext);
  return (
    <ScreenComponent>
      <AppText
        text={"Active Tickets"}
        size={20}
        color={"black"}
        center={true}
        bold={true}
      />
      <AppText
        text={tickets?.length}
        size={18}
        color={"black"}
        center={false}
        bold={false}
      />
      <View style={{ flex: 1, margin: 10 }}>
        <FlatList
          data={tickets}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <TicketCard {...item} />}
        />
      </View>
    </ScreenComponent>
  );
};

export default ActiveTicket;

const styles = StyleSheet.create({
  ticketCard: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  agency: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  agencyDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 10,
  },
  ticketCardBody: {
    gap: 10,
  },

  bodyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  statusPaid: {
    backgroundColor: colors.primaryButton,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  statusCompleted: {
    backgroundColor: "green",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  statusCancelled: {
    backgroundColor: "red",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
});
