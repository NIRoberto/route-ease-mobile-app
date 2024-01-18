import {
  Alert,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import AppText from "../../components/typo/AppText";
import colors from "../../config/colors";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ScreenComponent from "../../components/ScreenComponent";
import AppButton from "../../components/forms/AppButton";
import AppForm from "../../components/forms/AppForm";
import AppFormField from "../../components/forms/AppFormField";
import AppSubmitButton from "../../components/forms/AppSubmitButton";
import ReusableModal from "../../components/ReusableModal";
import { RouteCard } from "./SearchTicketResultScreen";
import AppContext from "../../context/context";
import { API } from "../../config/axios";

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
export const ContactDetails = ({ fullNames, email, phone }) => {
  return (
    <View style={styles.passengerCard}>
      <DetailsItem title="Full Names" value={fullNames || "Robert"} />
      <DetailsItem title="Email" value={email || "robert@gmail.com"} />
      <DetailsItem title="Phone" value={phone || "0787491277"} />
    </View>
  );
};

const SelectedPaymentMethod = ({ paymentMethod, route }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.paymentMethod}>
      <Image style={styles.logo} source={paymentMethod.logo} />
      <AppText text={paymentMethod.name} center={false} bold={true} size={18} />

      {/* <AppText
        text="Change"
        center={false}
        bold={false}
        size={18}
        color={colors.primaryButton}
        onPress={() => {
          console.log("Change payment method");
          navigation.navigate("Payment", {
            data: {
              ...route.params.data,
            },
          });
        }}
      /> */}
    </View>
  );
};
export const PriceDetails = ({ price, discount, total }) => {
  return (
    <View style={styles.passengerCard}>
      <DetailsItem title="Price" value={price || "2560 Rwf"} />
      <DetailsItem title="Discount" value={discount || "200 RwF"} />
      <DetailsItem title="Total" value={total || "2360 Rwf"} />
    </View>
  );
};

const ConfirmBookingScreen = ({ route }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [ticketModalVisible, setTicketModalVisible] = React.useState(false);
  const navigation = useNavigation();
  const { user } = useContext(AppContext);
  const [ticketId, setTicketId] = useState();

  const handleConfirmBooking = async () => {
    try {
      const response = await API.post(
        `tickets/buyTickets/${route.params.data._id}`,
        {
          ...route.params.data.passenger,
        },
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      );
      console.log(response.data);

      setTicketId(response.data.data.TicketId);
      setModalVisible(true);
    } catch (error) {
      Alert.alert("Failed to book ticket");
    }
  };
  const handlePayTicket = async (values) => {
    const data = {
      ...values,
      amount: route.params.data.directionId.price.toString(),
    };
    try {
      const response = await API.patch(
        `tickets/payforticket/${ticketId}`,
        {
          ...data,
        },
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      );
      console.log(response.data);
      setModalVisible(false);
      setTicketModalVisible(true);
    } catch (error) {
      console.log(error.response.data);
      Alert.alert("Failed to book ticket");
    }
  };

  return (
    <ScreenComponent>
      <View style={styles.container}>
        <AppText
          text="Trip details (Departure)"
          center={false}
          bold={true}
          size={20}
        />
        <RouteCard {...route.params.data} />
        <AppText text="Contact details" center={false} bold={true} size={20} />
        <ContactDetails {...route.params.data.passenger} />
        <AppText text="Payment Method" center={false} bold={true} size={20} />
        <SelectedPaymentMethod {...route.params.data} />
        <AppText text="Price details" center={false} bold={true} size={20} />
        <PriceDetails {...route.params.data} />
        <AppButton
          title={"Confirm Booking"}
          color={"white"}
          bgColor={colors.primaryButton}
          handlePress={handleConfirmBooking}
        />
      </View>
      <ReusableModal
        title={"Confirm Payment"}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      >
        <AppForm initialValues={{ phone: "" }} onSubmit={handlePayTicket}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <AppText text={"Price"} center={false} size={20} />
            <AppText
              text={route.params.data.directionId.price}
              center={false}
              bold={true}
              color={"black"}
              size={20}
            />
          </View>
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="phone"
            name="phone"
            placeholder="Phone"
            textContentType="emailAddress"
          />

          <AppSubmitButton title="Pay" />
        </AppForm>
      </ReusableModal>
      <ReusableModal
        title={""}
        modalVisible={ticketModalVisible}
        setModalVisible={setTicketModalVisible}
      >
        <View
          style={{
            justifyContent: "space-between",
            gap: 10,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              gap: 20,
            }}
          >
            <View
              style={{
                backgroundColor: colors.primaryButton,
                padding: 20,
                borderRadius: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons name="ticket" size={40} color="white" />
            </View>
            <AppText
              text="Your ticket has been booked successfully"
              center={true}
              bold={true}
              size={20}
            />
            <AppText
              text="You will receive a confirmation message on your phone number"
              center={true}
              bold={false}
              size={18}
            />
          </View>
          <AppButton
            title={"Done"}
            color={"white"}
            bgColor={colors.primaryButton}
            handlePress={() => {
              setTicketModalVisible(false);
              navigation.navigate("TransactionDetails", {
                data: {
                  ...route.params.data,
                },
              });
            }}
          />
        </View>
      </ReusableModal>
    </ScreenComponent>
  );
};

export default ConfirmBookingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    gap: 20,
  },
  passengerCard: {
    gap: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "white",
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    position: "absolute",

    padding: 20,
  },
  paymentMethod: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
});
