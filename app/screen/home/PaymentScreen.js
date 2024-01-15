import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { FlatList } from "react-native";
import colors from "../../config/colors";
import AppText from "../../components/typo/AppText";
import AppButton from "../../components/forms/AppButton";
import { useNavigation } from "@react-navigation/native";
import ScreenComponent from "../../components/ScreenComponent";

const dataArray = [
  {
    id: 1,
    logo: require("../../assets/payment/visa.jpeg"),
    name: "Visa",
  },
  {
    id: 2,
    logo: require("../../assets/payment/momo.jpeg"),

    name: "Mobile money",
  },
  {
    id: 3,
    logo: require("../../assets/payment/money.jpeg"),
    name: "Airtel money",
  },
];

const PaymentSelectionCard = ({
  logo,
  name,
  onPress,
  isSelected,
  ...otherProps
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      {...otherProps}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          margin: 5,
          borderRadius: 10,
          gap: 10,
          justifyContent: "space-between",
        }}
      >
        <Image style={styles.logo} source={logo} />
        <AppText
          text={name}
          size={15}
          color={"black"}
          center={true}
          bold={true}
        />
      </View>
      <View
        style={{
          backgroundColor: isSelected ? colors.primaryButton : "white",
          borderRadius: 10,
          height: 20,
          width: 20,
        }}
      >
        <View
          style={{
            backgroundColor: isSelected ? colors.primaryButton : "white",
            borderRadius: 10,
            height: 20,
            width: 20,
            borderWidth: 1,
            borderColor: colors.primaryButton,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

const PaymentScreen = ({ route }) => {
  const [selected, setSelected] = useState(1);
  const navigation = useNavigation();

  console.log(route.params.data);

  return (
    <ScreenComponent>
      <View
        style={{
          flex: 1,
          margin: 15,
        }}
      >
        <View
          style={{
            marginBottom: 20,
          }}
        >
          <AppText text={"Payment method"} size={20} bold={true} />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <FlatList
            data={dataArray}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <PaymentSelectionCard
                logo={item.logo}
                name={item.name}
                onPress={() => {
                  setSelected(item.id);
                }}
                isSelected={selected === item.id}
              />
            )}
          />

          <AppButton
            title={"continue"}
            color={"white"}
            bgColor={colors.primaryButton}
            handlePress={() => {
              navigation.navigate("ConfirmBooking", {
                data: {
                  ...route.params.data,
                  paymentMethod: dataArray.find((item) => item.id === selected),
                },
              });
            }}
          />
        </View>
      </View>
    </ScreenComponent>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    borderRadius: 10,
    gap: 10,
    justifyContent: "space-between",
    backgroundColor: "white",
    marginVertical: 10,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  text: {
    color: colors.primaryButton,
  },
});
