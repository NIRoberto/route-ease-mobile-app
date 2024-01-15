import { StyleSheet, Text, View } from "react-native";
import React from "react";

import QRCode from "react-native-qrcode-svg";
import ScreenComponent from "../../components/ScreenComponent";
import AppText from "../../components/typo/AppText";
import { RouteCard } from "./BookScreen";
import { ContactDetails } from "./ConfirmBookingScreen";
import AppButton from "../../components/forms/AppButton";
import colors from "../../config/colors";
import { useNavigation } from "@react-navigation/native";

const DetailsItem = ({ title, value }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 10,
        gap: 10,
      }}
    >
      <AppText text={title} center={false} bold={true} size={18} />
      <AppText text={value} center={false} bold={false} size={18} />
    </View>
  );
};

const PriceDetails = ({ status, price, discount, total }) => {
  return (
    <View style={styles.priceDetails}>
      <DetailsItem
        title="Status"
        value={
          status !== "paid" ? (
            <AppText text="Paid" color="green" bold={true} size={18} />
          ) : (
            <AppText text="Pending" color="red" bold={true} size={18} />
          )
        }
      />
      <DetailsItem title="Price" value={price || 3000} />
      <DetailsItem title="Discount" value={discount || 200} />
      <DetailsItem title="Total" value={price - discount || 2800} />
    </View>
  );
};

const TransactionDetailsScreen = ({ route }) => {
  console.log(route.params.data);
  const bookingId = "123456789";

  const navigation = useNavigation();
  return (
    <ScreenComponent>
      <View style={styles.container}>
        <View
          style={{
            // alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <AppText text="Booking ID :" bold={true} color="black" />
          <AppText text={bookingId} bold={true} color="black" />
        </View>

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <QRCode
            size={200}
            value={bookingId}
            color="black"
            backgroundColor="white"
          />
        </View>

        <AppText text="Trip Details (Departure)" bold={true} size={20} />
        <RouteCard
          {...route.params.data}
          center={false}
          bold={true}
          size={20}
        />
        <AppText text="Price Details" bold={true} size={20} color="black" />
        <PriceDetails {...route.params.data} />
        <AppText text="Passenger Details" bold={true} size={20} color="black" />
        <ContactDetails {...route.params.data.passenger} />

        <View
          style={{
            justifyContent: "space-between",
            marginVertical: 20,
            gap: 10,
          }}
        >
          <AppButton
            title={"Show Ticket"}
            color={"white"}
            bgColor={colors.primaryButton}
            handlePress={() => {
              navigation.navigate("ETicketScreen", {
                data: {
                  ...route.params.data,
                },
              });
            }}
          />

          <AppButton
            title={"Cancel Booking"}
            color={"white"}
            bgColor={colors.primaryButton}
            handlePress={() => {
              console.log("Confirm Booking");
            }}
          />
          <AppButton
            title={"Re-Schedule"}
            color={"white"}
            bgColor={colors.primaryButton}
            handlePress={() => {
              console.log("Confirm Booking");
            }}
          />
        </View>
      </View>
    </ScreenComponent>
  );
};

export default TransactionDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
    gap: 10,
  },

  priceDetails: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    gap: 10,
    marginVertical: 15,
  },
});
