import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import AppButton from "../../components/forms/AppButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import colors from "../../config/colors";
import AppPicker from "../../components/forms/AppPicker";
import AppForm from "../../components/forms/AppForm";
import AppFormField from "../../components/forms/AppFormField";
import AppText from "../../components/typo/AppText";
import ScreenComponent from "../../components/ScreenComponent";
import AppSubmitButton from "../../components/forms/AppSubmitButton";
import { RouteCard } from "./SearchTicketResultScreen";

const BookScreen = ({ route }) => {
  const { params } = useRoute();
  const navigation = useNavigation();
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <ScreenComponent>
      <View style={styles.container}>
        <View>
          <AppText
            text={"Trip Details (Departure)"}
            center={false}
            bold={true}
            size={20}
          />
          <RouteCard {...route.params.data} />
        </View>

        <AppText
          text={"Contact details"}
          center={false}
          bold={true}
          size={20}
        />
        <View style={styles.contactDetails}>
          <AppForm
            initialValues={{
              fullNames: "",
              email: "",
              phone: "",
            }}
            onSubmit={(values) => {
              // console.log(values);
              navigation.navigate("Payment", {
                data: {
                  passenger: values,
                  ...route.params.data,
                },
              });
            }}
          >
            <AppFormField
              name={"fullNames"}
              placeholder="Full Names"
              key={"Names"}
            />
            <AppFormField name={"email"} placeholder="Email" key={"email"} />
            <AppFormField name="phone" placeholder="Phone" />
            <AppSubmitButton title="Continue" />
          </AppForm>
        </View>
      </View>
    </ScreenComponent>
  );
};

export default BookScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    gap: 10,
  },
  contactDetails: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    gap: 20,
  },

  routeCard: {
    backgroundColor: "white",
    borderRadius: 10,
    margin: 0,
    marginVertical: 15,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    padding: 20,
    marginBottom: 10,
  },
  routeCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "space-between",
  },
  routeCardHeaderImage: {
    width: 70,
    height: 70,
    borderRadius: 25,
    marginRight: 10,
  },
  routeCardHeaderDetails: {
    flexDirection: "column",
  },
  routeCardDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  routeCardDetailsLeft: {
    flexDirection: "column",
    gap: 5,
  },
  routeCardDetailsRight: {
    flexDirection: "column",
  },
});
