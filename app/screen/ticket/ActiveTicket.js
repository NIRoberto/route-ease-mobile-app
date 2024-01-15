import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CompletedTicket from "./CompletedTicket";
import CancelledTicket from "./CancelledTicket";
import ScreenComponent from "../../components/ScreenComponent";
import AppText from "../../components/typo/AppText";
import colors from "../../config/colors";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

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
  travelAgency: { name, logo },
  startTime,
  endTime,
  date,
  status,
  duration,
  origin,
  destination,
  user: { fullName, email, phone },
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ETicketScreen", {
          data: {
            travelAgency: {
              name,
              logo,
            },
            startTime,
            endTime,
            date,
            status,
            duration,
            origin,
            destination,
            user: {
              fullName,
              email,
              phone,
            },
          },
        });
      }}
    >
      <View style={styles.ticketCard}>
        <View style={styles.agency}>
          <View style={styles.agencyDetails}>
            <Image style={styles.logo} source={logo} />
            <View>
              <AppText text={name} center={false} bold={true} size={10} />
            </View>
          </View>
          <View>
            {status === "Paid" ? (
              <View style={styles.statusPaid}>
                <AppText
                  text={status}
                  center={false}
                  bold={true}
                  size={14}
                  color={"white"}
                />
              </View>
            ) : status === "Completed" ? (
              <View style={styles.statusCompleted}>
                <AppText
                  text={status}
                  center={false}
                  bold={true}
                  size={14}
                  color={"white"}
                />
              </View>
            ) : (
              <View style={styles.statusCancelled}>
                <AppText
                  text={status}
                  center={false}
                  bold={true}
                  size={14}
                  color={"white"}
                />
              </View>
            )}
          </View>
        </View>
        <View style={styles.ticketCardBody}>
          <View style={styles.bodyItem}>
            <AppText text={origin} center={false} bold={true} size={18} />
            <AppText text={destination} center={false} bold={true} size={18} />
          </View>
          <View style={styles.bodyItem}>
            <AppText
              text={startTime}
              center={false}
              bold={false}
              size={18}
              color={colors.primaryButton}
            />
            <AppText
              text={` Duration ${duration}`}
              center={false}
              bold={false}
              size={14}
            />

            <AppText
              text={endTime}
              center={false}
              bold={false}
              size={18}
              color={colors.primaryButton}
            />
          </View>
          <View style={styles.bodyItem}>
            <AppText text={date} center={false} bold={false} size={14} />
            <AppText text={date} center={false} bold={false} size={14} />
          </View>
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
      <Tab.Screen name="Cancelled" component={CancelledTicket} />
    </Tab.Navigator>
  );
};
const ActiveTicket = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <ScreenComponent>
      <AppText
        text={"Active Tickets"}
        size={20}
        color={"black"}
        center={true}
        bold={true}
      />

      <View style={{ flex: 1, margin: 10 }}>
        <FlatList
          data={TicketsData}
          keyExtractor={(item) => item.id.toString()}
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
